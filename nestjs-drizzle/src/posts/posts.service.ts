import {
  Inject,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { and, eq, sql } from 'drizzle-orm';
import { Request } from 'express';
import { nanoid } from 'nanoid';
import sharp from 'sharp';
import {
  GCLOUD_STORAGE_PROVIDER,
  GCloudStorage,
} from 'src/google-cloud/cloud-storage.provider';
import { User, users } from 'src/users/user.schema';
import {
  DRIZZLE_PROVIDER,
  type DrizzlePostgres,
} from '../database/providers/drizzle.provider';
import { type CreatePostDto } from './dto/create-post.dto';
import { postImages } from './post-images.schema';
import { postLikes } from './post-likes.schema';
import { posts, type NewPost, type Post } from './post.schema';

@Injectable()
export class PostsService {
  constructor(
    @Inject(DRIZZLE_PROVIDER)
    private readonly db: DrizzlePostgres,
    @Inject(REQUEST)
    private readonly request: Request,
    @Inject(GCLOUD_STORAGE_PROVIDER)
    private readonly gcloudStorage: GCloudStorage,
  ) {}

  async getAllPosts(): Promise<Post[]> {
    const user = this.request.user as User | null;

    const postList = await this.db
      .select({
        id: posts.id,
        createdAt: posts.createdAt,
        updatedAt: posts.updatedAt,
        content: posts.content,
        likes: posts.likes,
        createdBy: {
          id: users.id,
          username: users.username,
          displayName: users.displayName,
        },
        image: {
          id: postImages.id,
          url: postImages.url,
        },
        isLiked: sql<boolean>`exists(${this.db
          .select()
          .from(postLikes)
          .where(
            and(
              eq(postLikes.postId, posts.id),
              eq(postLikes.userId, user ? user.id : ''),
            ),
          )})`,
      })
      .from(posts)
      .orderBy(posts.updatedAt)
      .innerJoin(users, eq(posts.createdBy, users.id))
      .leftJoin(postImages, eq(postImages.postId, posts.id));

    return postList;
  }

  async createPost(body: CreatePostDto): Promise<void> {
    const user = this.request.user as User;

    const newPost: NewPost = {
      content: body.content,
      createdBy: user.id,
    };

    await this.db.transaction(async (tx) => {
      const [result] = await tx
        .insert(posts)
        .values(newPost)
        .returning({ postId: posts.id });

      if (body.image) {
        const fileExt = body.image.originalname.split('.').pop();
        const filename = `${result.postId}${nanoid(3)}.${fileExt}`;
        const dest = 'posts/' + filename;

        const resizedImage = await sharp(body.image.buffer)
          .resize({
            height: 320,
            width: 240,
          })
          .toBuffer();

        try {
          await this.gcloudStorage
            .bucket('private-social-media')
            .file(dest)
            .save(resizedImage, { resumable: false });

          const url = `https://storage.googleapis.com/private-social-media/posts/${filename}`;

          await tx.insert(postImages).values({ postId: result.postId, url });
        } catch (e) {
          console.error(e);
          tx.rollback();
          return;
        }
      }
    });
  }

  async getPostById(postId: string): Promise<Post> {
    const user = this.request.user as User | null;

    const [post] = await this.db
      .select({
        id: posts.id,
        createdAt: posts.createdAt,
        updatedAt: posts.updatedAt,
        content: posts.content,
        likes: posts.likes,
        createdBy: {
          id: users.id,
          username: users.username,
          displayName: users.displayName,
        },
        image: {
          id: postImages.id,
          url: postImages.url,
        },
        isLiked: sql<boolean>`exists(${this.db
          .select()
          .from(postLikes)
          .where(
            and(
              eq(postLikes.postId, posts.id),
              eq(postLikes.userId, user ? user.id : ''),
            ),
          )})`,
      })
      .from(posts)
      .orderBy(posts.updatedAt)
      .innerJoin(users, eq(posts.createdBy, users.id))
      .leftJoin(postImages, eq(postImages.postId, posts.id))
      .where(eq(posts.id, postId));

    return post;
  }

  async deletePostById(postId: string): Promise<void> {
    try {
      await this.db.transaction(async (tx) => {
        await tx.delete(postImages).where(eq(postImages.postId, postId));
        await tx.delete(posts).where(eq(posts.id, postId));

        try {
          await this.gcloudStorage
            .bucket('private-social-media')
            .deleteFiles({ prefix: `posts/${postId}` });
        } catch (e) {
          console.log(e);
          tx.rollback();
        }
      });
    } catch (e) {
      console.error(e);
    }
  }

  async incrementPostLikesByOne(postId: string): Promise<void> {
    const user = this.request.user as User;

    const [{ exists }] = await this.db.execute(sql`
      select exists(
        select 1
        from ${postLikes}
        where ${postLikes.postId} = ${postId}
          and ${postLikes.userId} = ${user.id}
      )
    `);

    if (exists) {
      throw new UnprocessableEntityException('You already give like, bro');
    }

    await this.db.insert(postLikes).values({ postId, userId: user.id });

    // TODO: delete after api post likes completed
    await this.db
      .update(posts)
      .set({ likes: sql`${posts.likes} + 1` })
      .where(eq(posts.id, postId));
  }

  async decrementPostLikesByOne(postId: string): Promise<void> {
    const user = this.request.user as User;

    const [{ exists }] = await this.db.execute(sql`
      select exists(
        select 1
        from ${postLikes}
        where ${postLikes.postId} = ${postId}
          and ${postLikes.userId} = ${user.id}
      )
    `);

    if (!exists) {
      throw new UnprocessableEntityException("You haven't give like, bro");
    }

    await this.db
      .delete(postLikes)
      .where(and(eq(postLikes.postId, postId), eq(postLikes.userId, user.id)));

    // TODO: delete after api post likes completed
    await this.db
      .update(posts)
      .set({ likes: sql`${posts.likes} - 1` })
      .where(eq(posts.id, postId));
  }
}

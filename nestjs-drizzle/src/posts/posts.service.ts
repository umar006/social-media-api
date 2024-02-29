import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { and, eq, sql } from 'drizzle-orm';
import { Request } from 'express';
import { nanoid } from 'nanoid';
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
      .innerJoin(users, eq(posts.createdBy, users.id));

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
        const filename = `${nanoid()}.${fileExt}`;
        const dest = 'posts/' + filename;

        try {
          await this.gcloudStorage
            .bucket('private-social-media')
            .file(dest)
            .save(body.image.buffer, { resumable: false });

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

  async deletePostById(postId: string): Promise<void> {
    await this.db.delete(posts).where(eq(posts.id, postId));
  }

  async incrementPostLikesByOne(postId: string): Promise<void> {
    const user = this.request.user as User;

    await this.db.insert(postLikes).values({ postId, userId: user.id });

    // TODO: delete after api post likes completed
    await this.db
      .update(posts)
      .set({ likes: sql`${posts.likes} + 1` })
      .where(eq(posts.id, postId));
  }

  async decrementPostLikesByOne(postId: string): Promise<void> {
    const user = this.request.user as User;

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

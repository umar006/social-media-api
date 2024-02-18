import { Inject, Injectable } from '@nestjs/common';
import { and, eq, sql } from 'drizzle-orm';
import {
  DRIZZLE_PROVIDER,
  type DrizzlePostgres,
} from '../database/providers/drizzle.provider';
import { CreatePostDto } from './dto/create-post.dto';
import { NewPost, Post, posts } from './post.schema';
import { postLikes } from './post-likes.schema';

@Injectable()
export class PostsService {
  constructor(
    @Inject(DRIZZLE_PROVIDER)
    private readonly db: DrizzlePostgres,
  ) {}

  async getAllPosts(): Promise<Post[]> {
    const postList = await this.db.select().from(posts);

    return postList;
  }

  async createPost(body: CreatePostDto): Promise<void> {
    const newPost: NewPost = {
      ...body,
      createdBy: 'kT8JHmBC5RzpbthqWh5xm',
    };
    await this.db.insert(posts).values(newPost);
  }

  async deletePostById(postId: string): Promise<void> {
    await this.db.delete(posts).where(eq(posts.id, postId));
  }

  async incrementPostLikesByOne(postId: string): Promise<void> {
    // TODO: update user id after user management completed
    await this.db
      .insert(postLikes)
      .values({ postId, userId: 'kT8JHmBC5RzpbthqWh5xm' });

    // TODO: delete after api post likes completed
    await this.db
      .update(posts)
      .set({ likes: sql`${posts.likes} + 1` })
      .where(eq(posts.id, postId));
  }

  async decrementPostLikesByOne(postId: string): Promise<void> {
    // TODO: update user id after user management completed
    await this.db
      .delete(postLikes)
      .where(
        and(
          eq(postLikes.postId, postId),
          eq(postLikes.userId, 'kT8JHmBC5RzpbthqWh5xm'),
        ),
      );

    // TODO: delete after api post likes completed
    await this.db
      .update(posts)
      .set({ likes: sql`${posts.likes} - 1` })
      .where(eq(posts.id, postId));
  }
}

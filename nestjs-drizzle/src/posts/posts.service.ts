import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import {
  DRIZZLE_PROVIDER,
  type DrizzlePostgres,
} from '../database/providers/drizzle.provider';
import { CreatePostDto } from './dto/create-post.dto';
import { Post, posts } from './post.schema';

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
    await this.db.insert(posts).values(body);
  }

  async deletePostById(postId: string): Promise<void> {
    await this.db.delete(posts).where(eq(posts.id, postId));
  }
}

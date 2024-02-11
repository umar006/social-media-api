import { Inject, Injectable } from '@nestjs/common';
import {
  DRIZZLE_PROVIDER,
  type DrizzlePostgres,
} from '../database/providers/drizzle.provider';
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
}

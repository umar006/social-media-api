import { Inject, Injectable } from '@nestjs/common';
import { eq, getTableColumns } from 'drizzle-orm';
import {
  DRIZZLE_PROVIDER,
  DrizzlePostgres,
} from 'src/database/providers/drizzle.provider';
import type { PostComment } from './post-comments.schema';
import { postComments } from './post-comments.schema';
import { users } from 'src/users/user.schema';

@Injectable()
export class PostCommentsService {
  constructor(
    @Inject(DRIZZLE_PROVIDER)
    private readonly db: DrizzlePostgres,
  ) {}

  async getAllCommentsByPostId(postId: string): Promise<PostComment[]> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { postId: commentPostId, ...commentSelect } =
      getTableColumns(postComments);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { createdAt, updatedAt, password, ...userSelect } =
      getTableColumns(users);

    const comments = await this.db
      .select({ ...commentSelect, createdBy: userSelect })
      .from(postComments)
      .where(eq(postComments.postId, postId))
      .innerJoin(users, eq(users.id, postComments.createdBy));

    return comments;
  }
}

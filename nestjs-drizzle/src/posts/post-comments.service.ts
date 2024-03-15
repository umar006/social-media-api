import { Inject, Injectable } from '@nestjs/common';
import { eq, getTableColumns } from 'drizzle-orm';
import {
  DRIZZLE_PROVIDER,
  DrizzlePostgres,
} from 'src/database/providers/drizzle.provider';
import type { NewComment, PostComment } from './post-comments.schema';
import { postComments } from './post-comments.schema';
import { User, users } from 'src/users/user.schema';
import { CreateCommentDto } from './dto/create-comment.dto';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

@Injectable()
export class PostCommentsService {
  constructor(
    @Inject(DRIZZLE_PROVIDER)
    private readonly db: DrizzlePostgres,
    @Inject(REQUEST)
    private readonly request: Request,
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

  async createComment(postId: string, body: CreateCommentDto): Promise<void> {
    const user = this.request.user as User;

    const newComment = {
      createdBy: user.id,
      comment: body.comment,
      postId: postId,
    } as NewComment;

    await this.db.insert(postComments).values(newComment);
  }
}

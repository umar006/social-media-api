import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  Param,
  ParseFilePipe,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Public } from 'src/auth/public.decorator';
import type { FileUpload } from 'src/common/file-upload.interface';
import { CreateCommentDto } from './dto/create-comment.dto';
import type { CreatePostDto } from './dto/create-post.dto';
import type { PostComment } from './post-comments.schema';
import { PostCommentsService } from './post-comments.service';
import type { Post as PostSchema } from './post.schema';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(
    private readonly postsService: PostsService,
    private readonly postCommentsService: PostCommentsService,
  ) {}

  @Public()
  @Get()
  async getAllPosts(): Promise<PostSchema[]> {
    return await this.postsService.getAllPosts();
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async createPost(
    @Body() newPost: CreatePostDto,
    @UploadedFile(
      new ParseFilePipe({
        fileIsRequired: false,
        validators: [new FileTypeValidator({ fileType: 'image' })],
      }),
    )
    file: FileUpload,
  ): Promise<void> {
    await this.postsService.createPost({
      ...newPost,
      image: file,
    });
  }

  @Public()
  @Get(':postId')
  async getPostById(@Param('postId') postId: string): Promise<PostSchema> {
    return await this.postsService.getPostById(postId);
  }

  @Public()
  @Get(':postId/comments')
  async getPostCommentsByPostId(
    @Param('postId') postId: string,
  ): Promise<PostComment[]> {
    const comments =
      await this.postCommentsService.getAllCommentsByPostId(postId);

    return comments;
  }

  @Post(':postId/comments')
  async createComment(
    @Param('postId') postId: string,
    @Body() newComment: CreateCommentDto,
  ): Promise<void> {
    await this.postCommentsService.createComment(postId, newComment);
  }

  @Delete(':postId')
  async deletePostById(@Param('postId') postId: string): Promise<void> {
    await this.postsService.deletePostById(postId);
  }

  @Put(':postId/likes/increment')
  async incrementPostLikesByOne(
    @Param('postId') postId: string,
  ): Promise<void> {
    await this.postsService.incrementPostLikesByOne(postId);
  }

  @Put(':postId/likes/decrement')
  async decrementPostLikesByOne(
    @Param('postId') postId: string,
  ): Promise<void> {
    await this.postsService.decrementPostLikesByOne(postId);
  }
}

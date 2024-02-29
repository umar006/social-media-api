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
import { FileUpload } from 'src/common/file-upload.interface';
import { CreatePostDto } from './dto/create-post.dto';
import { Post as PostSchema } from './post.schema';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

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

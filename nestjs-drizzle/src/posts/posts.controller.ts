import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { Post as PostSchema } from './post.schema';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  async getAllPosts(): Promise<PostSchema[]> {
    return await this.postsService.getAllPosts();
  }

  @Post()
  async createPost(@Body() newPost: CreatePostDto): Promise<void> {
    await this.postsService.createPost(newPost);
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
}

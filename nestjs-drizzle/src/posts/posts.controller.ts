import { Body, Controller, Get, Post } from '@nestjs/common';
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
}

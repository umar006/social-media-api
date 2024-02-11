import { Controller, Get } from '@nestjs/common';
import { Post as PostSchema } from './post.schema';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  async getAllPosts(): Promise<PostSchema[]> {
    return await this.postsService.getAllPosts();
  }
}

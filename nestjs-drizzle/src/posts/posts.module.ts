import { Module } from '@nestjs/common';
import { GoogleCloudModule } from 'src/google-cloud/google-cloud.module';
import { PostCommentsService } from './post-comments.service';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';

@Module({
  imports: [GoogleCloudModule],
  providers: [PostsService, PostCommentsService],
  controllers: [PostsController],
})
export class PostsModule {}

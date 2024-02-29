import { Module } from '@nestjs/common';
import { GoogleCloudModule } from 'src/google-cloud/google-cloud.module';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';

@Module({
  imports: [GoogleCloudModule],
  providers: [PostsService],
  controllers: [PostsController],
})
export class PostsModule {}

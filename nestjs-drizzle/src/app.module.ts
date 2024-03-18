import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import { AuthModule } from './auth/auth.module';
import authConfig from './config/auth.config';
import databaseConfig from './config/database.config';
import googleCloudConfig from './config/google-cloud.config';
import { DatabaseModule } from './database/database.module';
import { GoogleCloudModule } from './google-cloud/google-cloud.module';
import { PostsModule } from './posts/posts.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        transport: {
          target: 'pino-pretty',
          options: {
            singleLine: true,
          },
        },
      },
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, authConfig, googleCloudConfig],
    }),
    DatabaseModule,
    UsersModule,
    PostsModule,
    AuthModule,
    GoogleCloudModule,
  ],
})
export class AppModule {}

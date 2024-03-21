import { Module } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { randomUUID } from 'crypto';
import { LoggerModule } from 'nestjs-pino';
import { AuthModule } from './auth/auth.module';
import authConfig from './config/auth.config';
import baseConfig from './config/base.config';
import databaseConfig from './config/database.config';
import googleCloudConfig from './config/google-cloud.config';
import loggerConfig from './config/logger.config';
import { DatabaseModule } from './database/database.module';
import { GoogleCloudModule } from './google-cloud/google-cloud.module';
import { PostsModule } from './posts/posts.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    LoggerModule.forRootAsync({
      inject: [loggerConfig.KEY, baseConfig.KEY],
      useFactory: (
        logCfg: ConfigType<typeof loggerConfig>,
        baseCfg: ConfigType<typeof baseConfig>,
      ) => {
        return {
          pinoHttp: {
            transport: {
              targets: [
                {
                  target: 'pino-pretty',
                  options: {
                    singleLine: true,
                    colorize: baseCfg.NODE_ENV === 'development',
                  },
                },
                {
                  target: 'pino-loki',
                  options: {
                    host: logCfg.LOKI_URL,
                  },
                },
              ],
            },
            genReqId: (req) => {
              return req.headers['x-correlation-id'] || randomUUID();
            },
          },
        };
      },
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        databaseConfig,
        authConfig,
        googleCloudConfig,
        loggerConfig,
        baseConfig,
      ],
    }),
    DatabaseModule,
    UsersModule,
    PostsModule,
    AuthModule,
    GoogleCloudModule,
  ],
})
export class AppModule {}

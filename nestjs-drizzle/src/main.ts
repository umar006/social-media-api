import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import { Logger } from 'nestjs-pino';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  app.enableCors();
  app.use(helmet());

  app.useGlobalPipes(new ValidationPipe());

  app.useLogger(app.get(Logger));

  app.setGlobalPrefix('api');

  await app.listen(3000);
}
bootstrap();

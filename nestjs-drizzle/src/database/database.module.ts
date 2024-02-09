import { Global, Module } from '@nestjs/common';
import {
  DRIZZLE_PROVIDER,
  drizzleProvider,
} from './providers/drizzle.provider';

@Global()
@Module({
  providers: [drizzleProvider],
  exports: [DRIZZLE_PROVIDER],
})
export class DatabaseModule {}

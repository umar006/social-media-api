import { Inject, Injectable } from '@nestjs/common';
import type { DrizzlePostgres } from 'src/database/providers/drizzle.provider';
import { DRIZZLE_PROVIDER } from 'src/database/providers/drizzle.provider';

@Injectable()
export class PostCommentsService {
  constructor(
    @Inject(DRIZZLE_PROVIDER)
    private readonly db: DrizzlePostgres,
  ) {}
}

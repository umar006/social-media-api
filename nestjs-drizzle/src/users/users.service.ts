import { Inject, Injectable } from '@nestjs/common';
import {
  DRIZZLE_PROVIDER,
  DrizzlePostgres,
} from 'src/database/providers/drizzle.provider';
import { User, users } from './user.schema';

@Injectable()
export class UsersService {
  constructor(
    @Inject(DRIZZLE_PROVIDER)
    private readonly db: DrizzlePostgres,
  ) {}

  async getAllUsers(): Promise<User[]> {
    const user = await this.db.select().from(users);

    return user;
  }
}

import { Inject, Injectable } from '@nestjs/common';
import { User, users } from './user.schema';
import {
  DrizzlePostgres,
  DRIZZLE_PROVIDER,
} from '../database/providers/drizzle.provider';

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

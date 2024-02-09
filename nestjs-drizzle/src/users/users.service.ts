import { Inject, Injectable } from '@nestjs/common';
import { getTableColumns } from 'drizzle-orm';
import {
  DRIZZLE_PROVIDER,
  DrizzlePostgres,
} from '../database/providers/drizzle.provider';
import { User, users } from './user.schema';

@Injectable()
export class UsersService {
  constructor(
    @Inject(DRIZZLE_PROVIDER)
    private readonly db: DrizzlePostgres,
  ) {}

  async getAllUsers(): Promise<User[]> {
    const { password, ...rest } = getTableColumns(users);
    const user = await this.db.select({ ...rest }).from(users);

    return user;
  }
}

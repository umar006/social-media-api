import { Inject, Injectable } from '@nestjs/common';
import { eq, getTableColumns } from 'drizzle-orm';
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
    const userList = await this.db.select({ ...rest }).from(users);

    return userList;
  }

  async getUserById(userId: number): Promise<User> {
    const { password, ...rest } = getTableColumns(users);
    const [user] = await this.db
      .select({ ...rest })
      .from(users)
      .where(eq(users.id, userId));

    return user;
  }
}

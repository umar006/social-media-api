import { Inject, Injectable } from '@nestjs/common';
import bcrypt from 'bcrypt';
import { eq, getTableColumns } from 'drizzle-orm';
import {
  DRIZZLE_PROVIDER,
  DrizzlePostgres,
} from '../database/providers/drizzle.provider';
import { CreateUserDto } from './dto/create-user.dto';
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

  async createUser(body: CreateUserDto): Promise<void> {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(body.password, saltOrRounds);
    const newUser = {
      ...body,
      password: hashedPassword,
    };
    await this.db.insert(users).values(newUser);
  }
}

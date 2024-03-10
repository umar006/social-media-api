import {
  Inject,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import bcrypt from 'bcrypt';
import { eq, getTableColumns, sql } from 'drizzle-orm';
import {
  DRIZZLE_PROVIDER,
  DrizzlePostgres,
} from '../database/providers/drizzle.provider';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserWithPassword, users } from './user.schema';

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

  async getUserById(userId: string): Promise<User> {
    const { password, ...rest } = getTableColumns(users);
    const [user] = await this.db
      .select({ ...rest })
      .from(users)
      .where(eq(users.id, userId));

    return user;
  }

  async getUserByUsernameWithPassword(
    username: string,
  ): Promise<UserWithPassword> {
    const [user] = await this.db
      .select()
      .from(users)
      .where(eq(users.username, username));

    return user;
  }

  async createUser(body: CreateUserDto): Promise<User> {
    const getUserQuery = this.db
      .select()
      .from(users)
      .where(eq(users.username, body.username));
    const [username] = await this.db.execute<{ exists: boolean }>(
      sql`SELECT EXISTS (${getUserQuery})`,
    );
    if (username.exists) {
      throw new UnprocessableEntityException('Username already exists');
    }

    const [user] = await this.db.insert(users).values(body).returning({
      id: users.id,
      username: users.username,
      displayName: users.displayName,
      createdAt: users.createdAt,
      updatedAt: users.updatedAt,
    });

    return user;
  }
}

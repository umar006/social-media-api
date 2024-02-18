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

  async getUserById(userId: string): Promise<User> {
    const { password, ...rest } = getTableColumns(users);
    const [user] = await this.db
      .select({ ...rest })
      .from(users)
      .where(eq(users.id, userId));

    return user;
  }

  async createUser(body: CreateUserDto): Promise<void> {
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

    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(body.password, saltOrRounds);
    const newUser = {
      ...body,
      password: hashedPassword,
    };
    await this.db.insert(users).values(newUser);
  }
}

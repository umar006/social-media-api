import { Inject, Injectable } from '@nestjs/common';
import {
  DRIZZLE_PROVIDER,
  DrizzlePostgres,
} from 'src/database/providers/drizzle.provider';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    @Inject(DRIZZLE_PROVIDER)
    private readonly db: DrizzlePostgres,
  ) {}
}

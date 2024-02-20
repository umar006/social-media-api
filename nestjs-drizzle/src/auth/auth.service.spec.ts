import { DeepMocked, createMock } from '@golevelup/ts-jest';
import { Test, TestingModule } from '@nestjs/testing';
import {
  DRIZZLE_PROVIDER,
  DrizzlePostgres,
} from 'src/database/providers/drizzle.provider';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let usersService: DeepMocked<UsersService>;
  let db: DeepMocked<DrizzlePostgres>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: DRIZZLE_PROVIDER,
          useValue: createMock<DrizzlePostgres>(),
        },
        {
          provide: UsersService,
          useValue: createMock<UsersService>(),
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    usersService = module.get(UsersService);
    db = module.get(DRIZZLE_PROVIDER);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

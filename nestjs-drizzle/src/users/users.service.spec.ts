import { DeepMocked, createMock } from '@golevelup/ts-jest';
import { Test, TestingModule } from '@nestjs/testing';
import {
  DRIZZLE_PROVIDER,
  DrizzlePostgres,
} from '../database/providers/drizzle.provider';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
  let db: DeepMocked<DrizzlePostgres>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: DRIZZLE_PROVIDER,
          useValue: createMock<DrizzlePostgres>(),
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    db = module.get(DRIZZLE_PROVIDER);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

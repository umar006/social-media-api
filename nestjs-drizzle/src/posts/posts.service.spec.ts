import { Test, TestingModule } from '@nestjs/testing';
import { PostsService } from './posts.service';
import { DeepMocked, createMock } from '@golevelup/ts-jest';
import {
  DRIZZLE_PROVIDER,
  DrizzlePostgres,
} from 'src/database/providers/drizzle.provider';

describe('PostsService', () => {
  let service: PostsService;
  let db: DeepMocked<DrizzlePostgres>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostsService,
        {
          provide: DRIZZLE_PROVIDER,
          useValue: createMock<DrizzlePostgres>(),
        },
      ],
    }).compile();

    service = module.get<PostsService>(PostsService);
    db = module.get(DRIZZLE_PROVIDER);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

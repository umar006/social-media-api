import { DeepMocked, createMock } from '@golevelup/ts-jest';
import { Test, TestingModule } from '@nestjs/testing';
import type { DrizzlePostgres } from 'src/database/providers/drizzle.provider';
import { DRIZZLE_PROVIDER } from 'src/database/providers/drizzle.provider';
import { PostCommentsService } from './post-comments.service';

describe('PostCommentsService', () => {
  let service: PostCommentsService;
  let db: DeepMocked<DrizzlePostgres>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostCommentsService,
        {
          provide: DRIZZLE_PROVIDER,
          useValue: createMock<DrizzlePostgres>(),
        },
      ],
    }).compile();

    service = module.get<PostCommentsService>(PostCommentsService);
    db = module.get(DRIZZLE_PROVIDER);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

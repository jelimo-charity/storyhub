import { Test, TestingModule } from '@nestjs/testing';
import { ArticletagService } from './articletag.service';

describe('ArticletagService', () => {
  let service: ArticletagService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ArticletagService],
    }).compile();

    service = module.get<ArticletagService>(ArticletagService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

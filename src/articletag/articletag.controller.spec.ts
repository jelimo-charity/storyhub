import { Test, TestingModule } from '@nestjs/testing';
import { ArticletagController } from './articletag.controller';
import { ArticletagService } from './articletag.service';

describe('ArticletagController', () => {
  let controller: ArticletagController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArticletagController],
      providers: [ArticletagService],
    }).compile();

    controller = module.get<ArticletagController>(ArticletagController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

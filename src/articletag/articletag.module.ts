import { Module } from '@nestjs/common';
import { ArticletagService } from './articletag.service';
import { ArticletagController } from './articletag.controller';

@Module({
  controllers: [ArticletagController],
  providers: [ArticletagService],
})
export class ArticletagModule {}

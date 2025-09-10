import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { StoriesService } from './stories.service';
import { StoriesController } from './stories.controller';
import { Article } from './models/articles.model';

@Module({
  imports: [SequelizeModule.forFeature([Article])],
  controllers: [StoriesController],
  providers: [StoriesService],
})
export class StoriesModule {}

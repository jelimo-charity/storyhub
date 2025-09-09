import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateStoryDto } from './dto/create-story.dto';
import { UpdateStoryDto } from './dto/update-story.dto';
import { Article } from './models/articles.model';

@Injectable()
export class StoriesService {
  constructor(
    @InjectModel(Article)
    private articleModel: typeof Article,
  ) {}

  async create(createStoryDto: CreateStoryDto): Promise<Article> {
    return this.articleModel.create(createStoryDto as any);
  }

  async findAll(): Promise<Article[]> {
    return this.articleModel.findAll();
  }

  async findOne(id: number): Promise<Article> {
    const article = await this.articleModel.findByPk(id);
    if (!article) throw new NotFoundException('Article not found');
    return article;
  }

  async update(id: number, updateStoryDto: UpdateStoryDto): Promise<[number, Article[]]> {
    return this.articleModel.update(updateStoryDto, {
      where: { id },
      returning: true,
    });
  }

  async remove(id: number): Promise<number> {
    return this.articleModel.destroy({ where: { id } });
  }
}

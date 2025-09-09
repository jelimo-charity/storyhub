import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
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
    const slug = this.generateSlug(createStoryDto.title);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return this.articleModel.create({
      ...createStoryDto,
      slug,
    } as any);
  }

  private generateSlug(title: string): string {
    // Process the title
    const baseSlug = title
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '')
      .replace(/--+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '');

    // Add random number for uniqueness
    const randomSuffix = Math.floor(Math.random() * 10000);

    // Return the complete slug
    return `${baseSlug}-${randomSuffix}`;
  }

  async findAll(): Promise<Article[]> {
    // Return just the articles without including relations for now
    return this.articleModel.findAll();
  }

  async findOne(id: number): Promise<Article> {
    // Return just the article without including relations for now
    const article = await this.articleModel.findByPk(id);
    if (!article) throw new NotFoundException('Article not found');
    return article;
  }

  async update(
    id: number,
    updateStoryDto: UpdateStoryDto,
    userId?: number,
  ): Promise<[number, Article[]]> {
    if (userId) {
      // If userId is provided, verify that the user is the author before updating
      const article = await this.articleModel.findByPk(id);
      if (!article) throw new NotFoundException('Article not found');

      // Only allow the author to update their own article
      if (article.authorId !== userId) {
        throw new UnauthorizedException(
          'You are not authorized to update this article',
        );
      }
    }

    // If updating the title, regenerate the slug
    if (updateStoryDto.title) {
      updateStoryDto.slug = this.generateSlug(updateStoryDto.title);
    }

    return this.articleModel.update(updateStoryDto, {
      where: { id },
      returning: true,
    });
  }

  async remove(id: number, userId?: number): Promise<number> {
    if (userId) {
      // If userId is provided, verify that the user is the author before deleting
      const article = await this.articleModel.findByPk(id);
      if (!article) throw new NotFoundException('Article not found');

      // Only allow the author to delete their own article
      if (article.authorId !== userId) {
        throw new UnauthorizedException(
          'You are not authorized to delete this article',
        );
      }
    }

    return this.articleModel.destroy({ where: { id } });
  }
}

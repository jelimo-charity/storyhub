import { Injectable } from '@nestjs/common';
import { CreateArticletagDto } from './dto/create-articletag.dto';
import { UpdateArticletagDto } from './dto/update-articletag.dto';

@Injectable()
export class ArticletagService {
  create(createArticletagDto: CreateArticletagDto) {
    return 'This action adds a new articletag';
  }

  findAll() {
    return `This action returns all articletag`;
  }

  findOne(id: number) {
    return `This action returns a #${id} articletag`;
  }

  update(id: number, updateArticletagDto: UpdateArticletagDto) {
    return `This action updates a #${id} articletag`;
  }

  remove(id: number) {
    return `This action removes a #${id} articletag`;
  }
}

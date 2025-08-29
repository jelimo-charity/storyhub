import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ArticletagService } from './articletag.service';
import { CreateArticletagDto } from './dto/create-articletag.dto';
import { UpdateArticletagDto } from './dto/update-articletag.dto';

@Controller('articletag')
export class ArticletagController {
  constructor(private readonly articletagService: ArticletagService) {}

  @Post()
  create(@Body() createArticletagDto: CreateArticletagDto) {
    return this.articletagService.create(createArticletagDto);
  }

  @Get()
  findAll() {
    return this.articletagService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.articletagService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateArticletagDto: UpdateArticletagDto) {
    return this.articletagService.update(+id, updateArticletagDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.articletagService.remove(+id);
  }
}

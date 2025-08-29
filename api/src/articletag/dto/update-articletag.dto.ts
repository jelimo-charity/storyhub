import { PartialType } from '@nestjs/mapped-types';
import { CreateArticletagDto } from './create-articletag.dto';

export class UpdateArticletagDto extends PartialType(CreateArticletagDto) {}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { Tag } from './models/tags.model';

@Injectable()
export class TagsService {
  constructor(
    @InjectModel(Tag)
    private tagModel: typeof Tag,
  ) {}

  async create(createTagDto: CreateTagDto): Promise<Tag> {
    try {
      return this.tagModel.create(createTagDto as any);
    } catch (error) {
      console.error('Error creating tag:', error);
      throw error;
    }
  }

  async findAll(): Promise<Tag[]> {
    try {
      return await this.tagModel.findAll();
    } catch (error) {
      console.error('Error fetching tags:', error);
      return [];
    }
  }

  async findOne(id: number): Promise<Tag> {
    try {
      const tag = await this.tagModel.findOne({
        where: { name: id.toString() },
      });
      if (!tag) throw new NotFoundException('Tag not found');
      return tag;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      console.error(`Error fetching tag with id ${id}:`, error);
      throw new NotFoundException('Tag not found or error occurred');
    }
  }

  async update(
    id: number,
    updateTagDto: UpdateTagDto,
  ): Promise<[number, Tag[]]> {
    return this.tagModel.update(updateTagDto, {
      where: { name: id.toString() },
      returning: true,
    });
  }

  async remove(id: number): Promise<number> {
    return this.tagModel.destroy({ where: { name: id.toString() } });
  }
}

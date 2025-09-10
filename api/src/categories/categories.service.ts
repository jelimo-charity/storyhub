import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './models/categories.model';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category)
    private categoryModel: typeof Category,
  ) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    try {
      // Need to use 'as any' to bypass TypeScript type checking
      return await this.categoryModel.create(createCategoryDto as any);
    } catch (error) {
      console.error('Error creating category:', error);
      throw error;
    }
  }

  async findAll(): Promise<Category[]> {
    // Just return the categories without any relations
    try {
      return await this.categoryModel.findAll();
    } catch (error) {
      console.error('Error fetching categories:', error);
      // Return empty array in case of error
      return [];
    }
  }

  async findOne(id: number): Promise<Category> {
    try {
      const category = await this.categoryModel.findByPk(id);
      if (!category) throw new NotFoundException('Category not found');
      return category;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      console.error(`Error fetching category with id ${id}:`, error);
      throw new NotFoundException('Category not found or error occurred');
    }
  }

  async update(
    id: number,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<[number, Category[]]> {
    return this.categoryModel.update(updateCategoryDto as any, {
      where: { id },
      returning: true,
    });
  }

  async remove(id: number): Promise<number> {
    return this.categoryModel.destroy({ where: { id } });
  }
}

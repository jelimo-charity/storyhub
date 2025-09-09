import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { Article } from 'src/stories/models/articles.model';

@Table({
  tableName: 'categories',
  timestamps: false,
})
export class Category extends Model<Category> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  declare id: number;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
    unique: true,
  })
  name: string;

  @HasMany(() => Article)
  articles: Article[];
}

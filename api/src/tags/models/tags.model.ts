import {
  Table,
  Column,
  Model,
  DataType,
  BelongsToMany,
} from 'sequelize-typescript';
import { ArticleTag } from 'src/articletag/models/articletag.model';
import { Article } from 'src/stories/models/articles.model';

@Table({
  tableName: 'tags',
  timestamps: false,
})
export class Tag extends Model<Tag> {
  @Column({
    type: DataType.STRING(50),
    allowNull: false,
    unique: true,
    primaryKey: true,
  })
  name: string;

  @BelongsToMany(() => Article, () => ArticleTag)
  articles: Article[];
}

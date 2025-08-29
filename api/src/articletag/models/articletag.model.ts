import { Table, Column, Model, DataType, ForeignKey } from 'sequelize-typescript';
import { Article } from 'src/stories/models/articles.model';
import { Tag } from 'src/tags/models/tags.model';

@Table({
  tableName: 'article_tags',
  timestamps: false
})
export class ArticleTag extends Model<ArticleTag> {
  @ForeignKey(() => Article)
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    field: 'article_id'
  })
  articleId: number;

  @ForeignKey(() => Tag)
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    field: 'tag_id'
  })
  tagId: number;
}
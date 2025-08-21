import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Article } from 'src/stories/models/articles.model';
import { User } from 'src/users/models/users.model';



@Table({
  tableName: 'likes',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false
})
export class Like extends Model<Like> {
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    field: 'user_id'
  })
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => Article)
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    field: 'article_id'
  })
  articleId: number;

  @BelongsTo(() => Article)
  article: Article;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    field: 'created_at'
  })
  declare createdAt: Date;
}
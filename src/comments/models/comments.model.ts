import { Table, Column, Model, DataType, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import { Article } from 'src/stories/models/articles.model';
import { User } from 'src/users/models/users.model';


@Table({
  tableName: 'comments',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false
})
export class Comment extends Model<Comment> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true
  })
  declare id: number;

  @Column({
    type: DataType.TEXT,
    allowNull: false
  })
  content: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: 'user_id'
  })
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => Article)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: 'article_id'
  })
  articleId: number;

  @BelongsTo(() => Article)
  article: Article;

  @ForeignKey(() => Comment)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    field: 'parent_comment_id'
  })
  parentCommentId: number;

  @BelongsTo(() => Comment, 'parent_comment_id')
  parentComment: Comment;

  @HasMany(() => Comment, 'parent_comment_id')
  replies: Comment[];
}
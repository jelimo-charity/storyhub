import { Table, Column, Model, DataType, ForeignKey, BelongsTo, BelongsToMany, HasMany } from 'sequelize-typescript';
import { ArticleTag } from 'src/articletag/models/articletag.model';
import { Category } from 'src/categories/models/categories.model';
import { Comment } from 'src/comments/models/comments.model';
import { Like } from 'src/likes/models/likes.model';
import { Tag } from 'src/tags/models/tags.model';
import { User } from 'src/users/models/users.model';


export enum ArticleStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published'
}

@Table({
  tableName: 'articles',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
})
export class Article extends Model<Article> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true
  })
  declare id: number;

  @Column({
    type: DataType.STRING(255),
    allowNull: false
  })
  title: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false
  })
  content: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
    unique: true
  })
  slug: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    field: 'cover_image'
  })
  coverImage: string;

  @Column({
    type: DataType.ENUM(...Object.values(ArticleStatus)),
    allowNull: false,
    defaultValue: ArticleStatus.DRAFT
  })
  status: ArticleStatus;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: 'author_id'
  })
  authorId: number;

  @BelongsTo(() => User)
  author: User;

  @ForeignKey(() => Category)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    field: 'category_id'
  })
  categoryId: number;

  @BelongsTo(() => Category)
  category: Category;

 @BelongsToMany(() => Tag, () => ArticleTag)
  tags: Tag[];

  @HasMany(() => Comment)
  comments: Comment[];

  @HasMany(() => Like)
  likes: Like[];

 
}
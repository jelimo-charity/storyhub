import { Table, Column, Model, DataType, HasMany, BelongsToMany, HasOne } from 'sequelize-typescript';
import { Comment } from 'src/comments/models/comments.model';
import { Like } from 'src/likes/models/likes.model';
import { Article } from 'src/stories/models/articles.model';


export enum UserRole {
  ADMIN = 'admin',
  AUTHOR = 'author',
  READER = 'reader'
}

@Table({
  tableName: 'users',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
})
export class User extends Model<User> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true
  })
  declare id: number;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
    unique: true
  })
  username: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  password: string;

  @Column({
    type: DataType.ENUM(...Object.values(UserRole)),
    allowNull: false,
    defaultValue: UserRole.READER
  })
  role: UserRole;

  @Column({
    type: DataType.TEXT,
    allowNull: true
  })
  bio: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    field: 'profile_picture'
  })
  profilePicture: string;

  @HasMany(() => Article)
  articles: Article[];

  @HasMany(() => Comment)
  comments: Comment[];

  @HasMany(() => Like)
  likes: Like[];


}
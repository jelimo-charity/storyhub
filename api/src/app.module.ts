import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { StoriesModule } from './stories/stories.module';
import { CategoriesModule } from './categories/categories.module';
import { CommentsModule } from './comments/comments.module';
import { LikesModule } from './likes/likes.module';
import { TagsModule } from './tags/tags.module';
import { ConfigModule } from '@nestjs/config'
import { SequelizeModule } from '@nestjs/sequelize';
import { ArticletagModule } from './articletag/articletag.module';
import { User } from './users/models/users.model';
import { Article } from './stories/models/articles.model';
import { Category } from './categories/models/categories.model';
import { ArticleTag } from './articletag/models/articletag.model';
import { Tag } from './tags/models/tags.model';
import { Like } from './likes/models/likes.model';
import { Comment } from './comments/models/comments.model';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT ?? '5432'),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      models: [User, Article, Category, Tag, ArticleTag, Like, Comment],
      autoLoadModels: true,
      synchronize: true, // Set to false in production
    }),
    AuthModule,
    UsersModule,
    StoriesModule,
    CategoriesModule,
    CommentsModule,
    LikesModule,
    TagsModule,
    ArticletagModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

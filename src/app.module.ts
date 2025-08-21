import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './stories/users/users.module';
import { UsersModule } from './users/users.module';
import { StoriesModule } from './stories/stories.module';
import { CategoriesModule } from './categories/categories.module';
import { CommentsModule } from './comments/comments.module';
import { LikesModule } from './likes/likes.module';
import { TagsModule } from './tags/tags.module';

@Module({
  imports: [UsersModule, StoriesModule, CategoriesModule, CommentsModule, LikesModule, TagsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

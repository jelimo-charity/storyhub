import { Routes } from '@angular/router';
import { Register } from './register/register';
import { Login } from './login/login';
import { Articles } from './articles/articles';
import { CreateArticle } from './create-article/create-article';
import { EditArticle } from './edit-article/edit-article';
import { Category } from './category/category';
import { Tags } from './tags/tags';
import { StoryDetail } from './story-detail/story-detail';
import { authGuard } from './auth.guard';
import { roleGuard } from './role.guard';

export const routes: Routes = [
  { path: '', component: Articles, canActivate: [authGuard] },
  { path: 'register', component: Register },
  { path: 'login', component: Login },
  {
    path: 'stories/:id',
    component: StoryDetail,
    canActivate: [authGuard],
  },
  {
    path: 'articles/create',
    component: CreateArticle,
    canActivate: [roleGuard(['author', 'admin'])],
  },
  {
    path: 'articles/edit/:id',
    component: EditArticle,
    canActivate: [roleGuard(['author', 'admin'])],
  },
  {
    path: 'categories',
    component: Category,
    canActivate: [roleGuard(['author', 'admin'])],
  },
  {
    path: 'tags',
    component: Tags,
    canActivate: [roleGuard(['author', 'admin'])],
  },
];

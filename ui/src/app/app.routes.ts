import { Routes } from '@angular/router';
import { Register } from './register/register';
import { Login } from './login/login';
import { Articles } from './articles/articles';
import { authGuard } from './auth.guard';

export const routes: Routes = [
  { path: '', component: Articles, canActivate: [authGuard] },
  { path: 'register', component: Register },
  { path: 'login', component: Login },
];

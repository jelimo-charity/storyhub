import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  // Allow access to login and register pages even without auth
  if (state.url === '/login' || state.url === '/register') {
    return true;
  }

  const token = localStorage.getItem('access_token');
  if (token) {
    return true;
  }
  const router = inject(Router);
  router.navigate(['/login']);
  return false;
};

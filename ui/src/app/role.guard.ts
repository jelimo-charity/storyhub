import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

export const roleGuard = (allowedRoles: string[]): CanActivateFn => {
  return (route, state) => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      const router = inject(Router);
      router.navigate(['/login']);
      return false;
    }

    try {
      const decodedToken: any = jwtDecode(token);
      if (!decodedToken || !decodedToken.role) {
        const router = inject(Router);
        router.navigate(['/']);
        return false;
      }

      const hasRole = allowedRoles.includes(decodedToken.role);
      if (!hasRole) {
        const router = inject(Router);
        router.navigate(['/']);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error decoding token:', error);
      const router = inject(Router);
      router.navigate(['/login']);
      return false;
    }
  };
};

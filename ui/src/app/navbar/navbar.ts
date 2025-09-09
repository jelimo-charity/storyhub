import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
  standalone: true,
  imports: [CommonModule, RouterLink],
})
export class Navbar {
  constructor(private router: Router) {}

  get isLoggedIn() {
    return !!localStorage.getItem('access_token');
  }

  navigateTo(path: string) {
    this.router.navigate([path]);
  }

  logout() {
    localStorage.removeItem('access_token');
    this.router.navigate(['/login']);
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
  standalone: true,
  imports: [CommonModule, RouterLink],
})
export class Navbar implements OnInit {
  userRoleValue: string | null = null;

  constructor(private router: Router) {}

  ngOnInit() {
    // Initialize the role when the component loads
    this.userRoleValue = this.getUserRole();
  }

  get isLoggedIn() {
    return !!localStorage.getItem('access_token');
  }

  getUserRole(): string | null {
    try {
      const token = localStorage.getItem('access_token');
      if (!token) return null;

      const decoded: any = jwtDecode(token);
      return decoded?.role || null;
    } catch (error) {
      return null;
    }
  }

  get userRole() {
    return this.userRoleValue;
  }

  get canCreateArticles() {
    const role = this.userRole;
    return role === 'author' || role === 'admin';
  }

  navigateTo(path: string) {
    this.router.navigate([path]);
  }

  logout() {
    localStorage.removeItem('access_token');
    this.userRoleValue = null;
    this.router.navigate(['/login']);
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.html',
  styleUrl: './category.css',
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class Category implements OnInit {
  categories: any[] = [];
  newCategory = {
    name: '',
  };

  loading = false;
  error = '';
  message = '';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.loadCategories();
  }

  goToHome() {
    this.router.navigate(['/']);
  }

  loadCategories() {
    this.http.get<any[]>('http://localhost:3000/categories', { withCredentials: true }).subscribe({
      next: (data) => {
        this.categories = data || [];
      },
      error: (err) => {
        console.error('Error loading categories:', err);
        this.error = 'Failed to load categories.';
        this.categories = []; 
      },
    });
  }

  createCategory() {
    this.loading = true;
    this.error = '';
    this.message = '';

    if (!this.newCategory.name) {
      this.error = 'Category name is required.';
      this.loading = false;
      return;
    }

    const token = localStorage.getItem('access_token');
    if (!token) {
      this.error = 'You must be logged in to create a category.';
      this.loading = false;
      return;
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    this.http
      .post('http://localhost:3000/categories', this.newCategory, {
        headers,
        withCredentials: true,
      })
      .subscribe({
        next: (response) => {
          this.loading = false;
          this.message = 'Category created successfully!';
          this.newCategory = { name: '' };
          this.loadCategories(); // Reload the categories
        },
        error: (err) => {
          // Check if it's a 201 status (Created) but treated as error
          if (err.status === 201) {
            this.loading = false;
            this.message = 'Category created successfully!';
            this.newCategory = { name: '' };
            this.loadCategories(); // Reload the categories
          } else {
            this.loading = false;
            this.error = err.error?.message || 'Failed to create category. Please try again.';
          }
        },
      });
  }
}

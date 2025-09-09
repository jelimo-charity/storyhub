import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.html',
  styleUrl: './create-article.css',
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class CreateArticle implements OnInit {
  article = {
    title: '',
    content: '',
    categoryId: null as number | null,
    tags: [] as string[],
  };

  categories: any[] = [];
  availableTags: any[] = [];
  newTag: string = '';

  loading = false;
  error = '';
  message = '';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    // Load categories
    this.http.get<any[]>('http://localhost:3000/categories', { withCredentials: true }).subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (err) => {
        console.error('Error loading categories:', err);
        this.error = 'Failed to load categories. You may need to create categories first.';
      },
    });

    // Load tags
    this.http.get<any[]>('http://localhost:3000/tags', { withCredentials: true }).subscribe({
      next: (data) => {
        this.availableTags = data;
      },
      error: (err) => {
        console.error('Error loading tags:', err);
      },
    });
  }

  addTag() {
    if (this.newTag && !this.article.tags.includes(this.newTag)) {
      this.article.tags.push(this.newTag);
      this.newTag = '';
    }
  }

  removeTag(tag: string) {
    this.article.tags = this.article.tags.filter((t) => t !== tag);
  }

  cancelCreate() {
    this.router.navigate(['/']);
  }

  goToCategories() {
    this.router.navigate(['/categories']);
  }

  goToTags() {
    this.router.navigate(['/tags']);
  }

  onSubmit(event: Event) {
    event.preventDefault();
    this.loading = true;
    this.error = '';
    this.message = '';

    // Validate required fields
    if (!this.article.title || !this.article.content) {
      this.error = 'Title and content are required.';
      this.loading = false;
      return;
    }

    // Make sure categoryId is a number
    if (this.article.categoryId) {
      this.article.categoryId = Number(this.article.categoryId);
    } else {
      // If categoryId is empty, show an error
      this.error = 'Please select a category.';
      this.loading = false;
      return;
    }

    const token = localStorage.getItem('access_token');
    if (!token) {
      this.error = 'You must be logged in to create an article.';
      this.loading = false;
      return;
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    this.http
      .post('http://localhost:3000/stories', this.article, {
        headers,
        withCredentials: true,
      })
      .subscribe({
        next: (response) => {
          this.loading = false;
          this.message = 'Article created successfully!';
          // Reset form
          this.article = {
            title: '',
            content: '',
            categoryId: null,
            tags: [],
          };
          // Redirect to home after a short delay
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 2000);
        },
        error: (err) => {
          this.loading = false;
          console.error('Error creating article:', err);
          this.error = err.error?.message || 'Failed to create article. Please try again.';
        },
      });
  }
}

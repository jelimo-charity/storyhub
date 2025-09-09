import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.html',
  styleUrl: './articles.css',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
})
export class Articles {
  articles: any[] = [];
  loading = true;
  error = '';

  constructor(private http: HttpClient, private router: Router) {
    this.fetchArticles();
  }

  fetchArticles() {
    this.http.get<any[]>('http://localhost:3000/stories', { withCredentials: true }).subscribe({
      next: (data) => {
        this.articles = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching articles:', err);
        this.error = err.error?.message || 'Failed to load articles';
        this.articles = [];
        this.loading = false;
      },
    });
  }

  openArticle(article: any) {
    this.router.navigate(['/stories', article.id]);
  }
}

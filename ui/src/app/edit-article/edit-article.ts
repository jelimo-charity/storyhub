import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.html',
  styleUrl: './edit-article.css',
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class EditArticle implements OnInit {
  articleId: string = '';
  article = {
    title: '',
    content: '',
    categoryId: '',
    tags: [] as string[],
  };

  categories: any[] = [];
  availableTags: any[] = [];
  newTag: string = '';

  loading = false;
  articleLoading = true;
  error = '';
  message = '';

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    // Get article ID from route
    this.route.params.subscribe((params) => {
      this.articleId = params['id'];
      this.loadArticle();
    });

    // Load categories
    this.http.get<any[]>('http://localhost:3000/categories', { withCredentials: true }).subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (err) => {
        console.error('Error loading categories:', err);
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

  loadArticle() {
    const token = localStorage.getItem('access_token');

    this.http
      .get(`http://localhost:3000/stories/${this.articleId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      })
      .subscribe({
        next: (data: any) => {
          this.articleLoading = false;
          this.article = {
            title: data.title,
            content: data.content,
            categoryId: data.categoryId,
            tags: data.tags?.map((tag: any) => tag.name) || [],
          };
        },
        error: (err) => {
          this.articleLoading = false;
          console.error('Error loading article:', err);
          this.error =
            'Failed to load article. It may have been deleted or you do not have permission to edit it.';
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

  cancelEdit() {
    this.router.navigate(['/']);
  }

  onSubmit(event: Event) {
    event.preventDefault();
    this.loading = true;
    this.error = '';
    this.message = '';

    const token = localStorage.getItem('access_token');

    this.http
      .patch(`http://localhost:3000/stories/${this.articleId}`, this.article, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      })
      .subscribe({
        next: (response) => {
          this.loading = false;
          this.message = 'Article updated successfully!';
          // Redirect to home after a short delay
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 2000);
        },
        error: (err) => {
          this.loading = false;
          console.error('Error updating article:', err);
          this.error = err.error?.message || 'Failed to update article. Please try again.';
        },
      });
  }
}

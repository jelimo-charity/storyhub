import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.html',
  styleUrl: './tags.css',
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class Tags implements OnInit {
  tags: any[] = [];
  newTag = {
    name: '',
  };
  editingTag: any = null;

  loading = false;
  error = '';
  message = '';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.loadTags();
  }

  goToHome() {
    this.router.navigate(['/']);
  }

  loadTags() {
    this.http.get<any[]>('http://localhost:3000/tags', { withCredentials: true }).subscribe({
      next: (data) => {
        this.tags = data || [];
      },
      error: (err) => {
        console.error('Error loading tags:', err);
        this.error = 'Failed to load tags.';
        this.tags = []; // Ensure tags is always an array
      },
    });
  }

  createTag() {
    this.loading = true;
    this.error = '';
    this.message = '';

    if (!this.newTag.name) {
      this.error = 'Tag name is required.';
      this.loading = false;
      return;
    }

    const token = localStorage.getItem('access_token');
    if (!token) {
      this.error = 'You must be logged in to create a tag.';
      this.loading = false;
      return;
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    this.http
      .post('http://localhost:3000/tags', this.newTag, {
        headers,
        withCredentials: true,
      })
      .subscribe({
        next: (response) => {
          this.loading = false;
          this.message = 'Tag created successfully!';
          this.newTag = { name: '' };
          this.loadTags(); // Reload the tags
        },
        error: (err) => {
          // Check if it's a 201 status (Created) but treated as error
          if (err.status === 201) {
            this.loading = false;
            this.message = 'Tag created successfully!';
            this.newTag = { name: '' };
            this.loadTags(); // Reload the tags
          } else {
            this.loading = false;
            this.error = err.error?.message || 'Failed to create tag. Please try again.';
          }
        },
      });
  }

  editTag(tag: any) {
    this.editingTag = { ...tag };
    this.message = `Editing tag: ${tag.name}`;
  }

  deleteTag(id: number) {
    if (!confirm('Are you sure you want to delete this tag?')) {
      return;
    }

    const token = localStorage.getItem('access_token');
    if (!token) {
      this.error = 'You must be logged in to delete a tag.';
      return;
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    this.http
      .delete(`http://localhost:3000/tags/${id}`, {
        headers,
        withCredentials: true,
      })
      .subscribe({
        next: () => {
          this.message = 'Tag deleted successfully!';
          this.loadTags(); // Reload the tags
        },
        error: (err) => {
          this.error = err.error?.message || 'Failed to delete tag. Please try again.';
        },
      });
  }

  updateTag() {
    this.loading = true;
    this.error = '';
    this.message = '';

    if (!this.editingTag?.name) {
      this.error = 'Tag name is required.';
      this.loading = false;
      return;
    }

    const token = localStorage.getItem('access_token');
    if (!token) {
      this.error = 'You must be logged in to update a tag.';
      this.loading = false;
      return;
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    this.http
      .patch(
        `http://localhost:3000/tags/${this.editingTag.id}`,
        { name: this.editingTag.name },
        {
          headers,
          withCredentials: true,
        }
      )
      .subscribe({
        next: (response) => {
          this.loading = false;
          this.message = 'Tag updated successfully!';
          this.editingTag = null;
          this.loadTags(); // Reload the tags
        },
        error: (err) => {
          // Check if it's a 200 status but treated as error
          if (err.status === 200) {
            this.loading = false;
            this.message = 'Tag updated successfully!';
            this.editingTag = null;
            this.loadTags(); // Reload the tags
          } else {
            this.loading = false;
            this.error = err.error?.message || 'Failed to update tag. Please try again.';
          }
        },
      });
  }
}

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-story-detail',
  templateUrl: './story-detail.html',
  styleUrl: './story-detail.css',
  standalone: true,
  imports: [CommonModule],
})
export class StoryDetail implements OnInit {
  story: any = null;
  loading = true;
  error = '';

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.fetchStory(id);
      }
    });
  }

  fetchStory(id: string) {
    const token = localStorage.getItem('access_token');

    this.http
      .get<any>(`http://localhost:3000/stories/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      })
      .subscribe({
        next: (data) => {
          this.story = data;
          this.loading = false;
        },
        error: (err) => {
          console.error('Error fetching story:', err);
          this.error = err.error?.message || 'Failed to load story';
          this.loading = false;
        },
      });
  }
}

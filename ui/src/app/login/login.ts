import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrl: './login.css',
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class Login {
  email = '';
  password = '';
  error = '';

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit(event: Event) {
    event.preventDefault();
    this.http
      .post<any>(
        'http://localhost:3000/auth/login',
        {
          email: this.email,
          password: this.password,
        },
        { withCredentials: true }
      )
      .subscribe({
        next: (res) => {
          localStorage.setItem('access_token', res.access_token);
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error('Login error:', err);
          this.error = err.error?.message || 'Login failed';
        },
      });
  }
}

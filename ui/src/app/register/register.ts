import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.html',
  styleUrl: './register.css',
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class Register {
  username = '';
  email = '';
  password = '';
  message = '';
  error = '';

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit(event: Event) {
    event.preventDefault();
    this.http
      .post<any>(
        'http://localhost:3000/auth/register',
        {
          username: this.username,
          email: this.email,
          password: this.password,
        },
        { withCredentials: true }
      )
      .subscribe({
        next: (res) => {
          this.message = 'Registration successful!';
          this.error = '';
          // Optionally redirect to login
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.error('Registration error:', err);
          this.error = err.error?.message || 'Registration failed';
          this.message = '';
        },
      });
  }
}

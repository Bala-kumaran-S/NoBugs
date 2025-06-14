import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router'; // <-- Import Router
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule]
})
export class LoginComponent {
  loginForm: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router // <-- Inject Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.valid) {
      console.log("Sending login request to /api/auth/login");
      const apiUrl = 'http://localhost:8080/api/auth/login';
      this.http.post<{ token: string }>(apiUrl, this.loginForm.value).subscribe({
        next: (response) => {
          // Assume response contains the token string
          localStorage.setItem('token', response.token);
          console.log('Login successful:', response);
         // this.router.navigate(['/users']); // <-- Redirect after login
         this.router.navigate(['/dashboard/research']); // <-- Redirect to researcher dashboard
        },
        error: (error) => {
          console.error('Login failed:', error);
        }
      });
    }
  }
}
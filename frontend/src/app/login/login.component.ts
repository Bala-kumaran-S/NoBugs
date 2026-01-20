import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NotifyService } from '../services/notify.service';
import { environment } from '../../environment/environment';
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
    private router: Router,
    private notify: NotifyService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit() {
    this.submitted = true;

    if (!this.loginForm.valid) {
      this.notify.info('Please fill in all required fields correctly.');
      return;
    }

    //this.notify.info('Signing you in...');

    const apiUrl = `${environment.apiBaseUrl}/api/auth/login`;

    this.http.post<{ token: string; refreshToken: string }>(apiUrl, this.loginForm.value)
      .subscribe({
        next: (response) => {
          localStorage.setItem('token', response.token);
          localStorage.setItem('refreshToken', response.refreshToken);

          this.notify.success('Login successful');

          this.router.navigate(['/dashboard/research']);
        },
        error: (error) => {
          console.error('Login failed:', error);

          if (error.status === 401) {
            this.notify.error('Invalid email or password.');
          } else {
            this.notify.error('Login failed. Please try again.');
          }
        }
      });
  }
}

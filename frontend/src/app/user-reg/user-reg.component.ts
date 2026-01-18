import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NotifyService } from '../services/notify.service';

@Component({
  selector: 'app-user-reg',
  templateUrl: './user-reg.component.html',
  styleUrl: './user-reg.component.css',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule]
})
export class UserRegComponent {

  registrationForm: FormGroup;
  submitted = false;
  submitting = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private notify: NotifyService
  ) {
    this.registrationForm = this.fb.group({
      username: ['', [Validators.required, Validators.maxLength(25)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(255)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      role: ['', [Validators.required]]
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.registrationForm.invalid || this.submitting) {
      if (this.registrationForm.invalid) {
        this.notify.info('Please fill all required fields correctly.');
      }
      return;
    }

    this.submitting = true;
    this.notify.info('Creating your account...');

    const apiUrl = 'http://localhost:8080/api/auth/register';

    this.http.post(apiUrl, this.registrationForm.value).subscribe({
      next: () => {
        this.submitting = false;
        this.notify.success('Registration successful! You can now log in.');

        localStorage.setItem('registrationSuccess', 'true');

        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 800);
      },
      error: (error) => {
        this.submitting = false;
        this.notify.error(error?.error?.message || 'Registration failed. Please try again.');
      }
    });
  }
}

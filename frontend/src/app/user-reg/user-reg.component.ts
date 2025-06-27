import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RedirectCommand, Router } from '@angular/router';

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

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.registrationForm = this.fb.group({
      username: ['', [Validators.required, Validators.maxLength(25)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(255)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      role: ['', [Validators.required]]
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.registrationForm.valid) {
      // Replace with your backend API endpoint
      const apiUrl = 'http://localhost:8080/api/auth/register';
      this.http.post(apiUrl, this.registrationForm.value).subscribe({
        next: (response) => {
          console.log('Registration successful:', response);
          this.router.navigate(['/login']);
          localStorage.setItem('registrationSuccess', 'true');
           // Navigate to login page after successful registration
        },
        error: (error) => {
          console.error('Registration failed:', error);
        }
      });
    }
  }
}
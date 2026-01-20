import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class ContactUsComponent {

  contactForm: FormGroup;
  submitted = false;
  loading = false;
  success: string | null = null;
  error: string | null = null;

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: [''],
      message: ['', Validators.required]
    });
  }

  get f() {
    return this.contactForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    this.success = null;
    this.error = null;

    if (this.contactForm.invalid) {
      return;
    }

    this.loading = true;

    // TEMP: simulate API call
    setTimeout(() => {
      this.loading = false;
      this.success = 'Your message has been sent successfully.';
      this.contactForm.reset();
      this.submitted = false;
    }, 1000);
  }
}

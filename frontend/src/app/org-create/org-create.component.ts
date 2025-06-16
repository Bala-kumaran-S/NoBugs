import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { OrganizationService } from '../services/organization.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-org-create',
  templateUrl: './org-create.component.html',
  styleUrls: ['./org-create.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule]
})
export class OrgCreateComponent {
  orgForm: FormGroup;
  submitted = false;
  error = '';
  success = '';

  constructor(
    private fb: FormBuilder,
    private orgService: OrganizationService,
    private router: Router
  ) {
    this.orgForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      contactEmail: ['', [Validators.required, Validators.email, Validators.maxLength(255)]],
      description: ['', [Validators.maxLength(500)]]
    });
  }

  get f() { return this.orgForm.controls; }

  onSubmit() {
    this.submitted = true;
    this.error = '';
    this.success = '';

    if (this.orgForm.invalid) {
      return;
    }

    this.orgService.registerOrganization(this.orgForm.value).subscribe({
      next: org => {
        console.log("registration sucess");
        this.success = 'Organization registered successfully!';
        setTimeout(() => this.router.navigate(['/organization/view']), 1500);
      },
      error: err => {
        console.log("org reg failed");
        this.error = err.error?.message || 'Registration failed. Please try again.';
      }
    });
  }
}
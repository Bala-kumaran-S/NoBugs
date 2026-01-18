import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { OrganizationService } from '../services/organization.service';
import { Router } from '@angular/router';
import { NotifyService } from '../services/notify.service';

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

  constructor(
    private fb: FormBuilder,
    private orgService: OrganizationService,
    private router: Router,
    private notify: NotifyService
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

    if (this.orgForm.invalid) {
      return;
    }

    this.orgService.registerOrganization(this.orgForm.value).subscribe({
      next: org => {
        this.notify.success('Organization registered successfully!');
        setTimeout(() => this.router.navigate(['/organization/view']), 1500);
      },
      error: err => {
        this.notify.error(err.error?.message || 'Registration failed. Please try again.');
      }
    });
  }
}
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { BugReportService, BugReportDTO } from '../services/bug.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-submit-bug',
  templateUrl: './submit-bug.component.html',
  styleUrls: ['./submit-bug.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule]
})
export class SubmitBugComponent {
  bugForm: FormGroup;
  submitted = false;
  error = '';
  success = '';
  scopeId: number;

  constructor(
    private fb: FormBuilder,
    private bugService: BugReportService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.scopeId = Number(this.route.snapshot.paramMap.get('scopeId'));
    this.bugForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(255)]],
      description: ['', [Validators.required]],
      reporterSeverity: ['MEDIUM', Validators.required],
      affectedEndpoint: [''],
      stepsToReproduce: ['', Validators.required],
      attachmentUrl1: ['']
    });
  }

  get f() { return this.bugForm.controls; }

  onSubmit() {
    this.submitted = true;
    this.error = '';
    this.success = '';

    if (this.bugForm.invalid) return;

    const bug: BugReportDTO = {
      ...this.bugForm.value,
      scopeId: this.scopeId
    };

    this.bugService.submitBug(bug).subscribe({
      next: () => {
        this.success = 'Bug report submitted!';
        setTimeout(() => this.router.navigate(['/dashboard/research']), 1500);
      },
      error: err => {
        this.error = err.error?.message || 'Failed to submit bug report.';
      }
    });
  }
}

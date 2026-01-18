import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { BugService, BugReportDTO } from '../services/bug.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifyService } from '../services/notify.service';

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
  submitting = false;
  scopeId: number;

  constructor(
    private fb: FormBuilder,
    private bugService: BugService,
    private route: ActivatedRoute,
    private router: Router,
    private notify: NotifyService
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

  get f() {
    return this.bugForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.bugForm.invalid || this.submitting) {
      return;
    }

    this.submitting = true;
    this.notify.info('Submitting bug report...');

    const bug: BugReportDTO = {
      ...this.bugForm.value,
      scopeId: this.scopeId
    };

    this.bugService.submitBug(bug).subscribe({
      next: () => {
        this.notify.success('Bug report submitted!');
        this.submitting = false;

        setTimeout(() => {
          this.router.navigate(['/dashboard/research']);
        }, 1200);
      },
      error: err => {
        this.submitting = false;
        this.notify.error(err?.error?.message || 'Failed to submit bug report.');
      }
    });
  }
}

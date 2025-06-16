import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BugReportService, BugReportDTO } from '../services/bug.service';
import { ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule],
  selector: 'app-bug-report-review',
  templateUrl: './bug-report-review.component.html',
  styleUrls: ['./bug-report-review.component.css']
})
export class BugReportReviewComponent implements OnInit {
  bug?: BugReportDTO;
  loading = true;
  error = '';
  success = '';
  reviewForm: FormGroup;

  constructor(
    private bugService: BugReportService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.reviewForm = this.fb.group({
      status: ['SUBMITTED'],
      adminSeverity: [''],
      adminNotes: ['']
    });
  }

  ngOnInit() {
    const bugId = Number(this.route.snapshot.paramMap.get('id'));
    this.bugService.getBugById(bugId).subscribe({
      next: bug => {
        this.bug = bug;
        console.log('Loaded bug report:', this.bug);
        this.reviewForm.patchValue({
          status: bug.status,
          adminSeverity: bug.adminSeverity || '',
          adminNotes: bug.adminNotes || ''
        });
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load bug report.';
        this.loading = false;
      }
    });
  }

  onSubmitReview() {
    if (!this.bug) return;
    const updated = {
      ...this.bug,
      ...this.reviewForm.value
    };
    this.bugService.updateBug(this.bug.id!, updated).subscribe({
      next: bug => {
        this.success = 'Bug report updated!';
        this.bug = bug; 
      },
      error: () => this.error = 'Failed to update bug report.'
    });
  }
}

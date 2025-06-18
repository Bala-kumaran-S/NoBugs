import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BugReportService, BugReportDTO } from '../services/bug.service';
import { ActivatedRoute } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Component({
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
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
  
  @Input() userId!: number | undefined;
  reputationPoints?: number; // Add this line

  constructor(
    private bugService: BugReportService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private http: HttpClient // Inject HttpClient
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

    // First, update the bug report
    this.bugService.updateBug(this.bug.id!, updated).subscribe({
      next: bug => {
        this.success = 'Bug report updated!';
        this.bug = bug;

        // Then, update the reputation (if you want to do it automatically)
        const userId = bug.reporter;
        if (userId && this.reputationPoints) {
          const token = localStorage.getItem('token');
          const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
          this.http.put(`http://localhost:8080/api/users/${userId}/reputation`, { points: this.reputationPoints },  { headers })
            .subscribe({
              next: () => this.success += ' Reputation updated!',
              error: () => this.error = 'Bug updated, but failed to update reputation.'
            });
        }
      },
      error: () => this.error = 'Failed to update bug report.'
    });
  }
}

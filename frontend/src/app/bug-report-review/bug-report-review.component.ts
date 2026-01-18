import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BugService, BugReportDTO } from '../services/bug.service';
import { ActivatedRoute } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { NotifyService } from '../services/notify.service';

@Component({
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
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
    private bugService: BugService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private http: HttpClient,
    private notify: NotifyService // Inject HttpClient
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
        this.notify.error('Failed to load bug report.');
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
      this.bug = bug;
      this.notify.success('Bug report updated!');

      const userId = bug.reporter;
      const severity = updated.adminSeverity;
      const points = this.calculateReputation(severity);

      if (userId != null && points > 0) {
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`
        });

        this.http.put(
          `http://localhost:8080/api/users/${userId}/reputation`,
          { points },
          { headers }
        ).subscribe({
          next: () => {
            this.notify.success('Bug report updated and reputation updated!');
          },
          error: () => {
            this.notify.error('Bug updated, but failed to update reputation.');
          }
        });
      }
    },
    error: () => {
      this.notify.error('Failed to update bug report.');
    }
  });
}

  private calculateReputation(severity: string): number {
  switch (severity) {
    case 'CRITICAL': return 50;
    case 'HIGH': return 30;
    case 'MEDIUM': return 15;
    case 'LOW': return 5;
    default: return 0;
  }
}

}

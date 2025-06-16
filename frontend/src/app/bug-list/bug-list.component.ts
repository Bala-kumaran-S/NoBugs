import { Component, OnInit } from '@angular/core';
import { BugReportService, BugReportDTO } from '../services/bug.service';

@Component({
  selector: 'app-my-bugs',
  templateUrl: './bug-list.component.html',
  styleUrls: ['./bug-list.component.css']
})
export class MyBugsComponent implements OnInit {
  bugs: BugReportDTO[] = [];
  loading = true;
  error = '';

  constructor(private bugService: BugReportService) {}

  ngOnInit() {
    this.bugService.getMyBugs().subscribe({
      next: bugs => {
        this.bugs = bugs;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load bug reports.';
        this.loading = false;
      }
    });
  }
}

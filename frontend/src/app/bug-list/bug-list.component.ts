import { Component, OnInit } from '@angular/core';
import { BugService, BugReportDTO } from '../services/bug.service';
import { ResearchDashService, OrganizationSummary, BugReport } from '../services/research-dash.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-bugs',
  templateUrl: './bug-list.component.html',
  styleUrls: ['./bug-list.component.css'],
  imports: [CommonModule],
  standalone: true
})
export class MyBugsComponent implements OnInit {

  bugReports: BugReport[] = [];
 
  loadingBugs = true;
  errorBugs = '';

  constructor(private dashboardService:ResearchDashService, private router: Router) {}

  ngOnInit() {
    this.dashboardService.getMyBugReports().subscribe({
      next: bugs => {
        this.bugReports = bugs;
        this.loadingBugs = false;
        this.errorBugs = '';
        console.log('Loaded bug reports:', this.bugReports);
        
      },
      error: () => {
        this.errorBugs = 'Failed to load bug reports.';
      }
    });

    
    
  }

  viewBug(bug: BugReport) {
      this.router.navigate(['/researcher/bugs', bug.id]);
    }
}

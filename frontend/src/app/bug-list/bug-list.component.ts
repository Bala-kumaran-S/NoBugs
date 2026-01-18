import { Component, OnInit } from '@angular/core';
import { ResearchDashService, BugReport } from '../services/research-dash.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NotifyService } from '../services/notify.service';

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
  private firstLoad = true;

  constructor(
    private dashboardService: ResearchDashService,
    private router: Router,
    private notify: NotifyService
  ) {}

  ngOnInit() {
    this.loadBugs();
  }

  private loadBugs() {
    this.notify.info('Loading your bug reports...');

    this.dashboardService.getMyBugReports().subscribe({
      next: bugs => {
        this.bugReports = bugs;
        this.loadingBugs = false;

        if (this.firstLoad) {
          this.notify.success('Bug reports loaded');
          this.firstLoad = false;
        }
      },
      error: () => {
        this.loadingBugs = false;
        this.notify.error('Failed to load bug reports.');
      }
    });
  }

  viewBug(bug: BugReport) {
    this.router.navigate(['/researcher/bugs', bug.id]);
  }
}

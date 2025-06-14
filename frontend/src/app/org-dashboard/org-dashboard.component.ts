import { Component, OnInit } from '@angular/core';
import { OrganizationService } from '../services/organization.service';
import { BugService } from '../services/bug.service';
import { ScopeService } from '../services/scope.service';

@Component({
  selector: 'app-org-dashboard',
  templateUrl: './org-dashboard.component.html',
  styleUrls: ['./org-dashboard.component.css']
})
export class OrgDashboardComponent implements OnInit {
  organization: any;
  approvalStatus: string = '';
  scopes: any[] = [];
  bugs: any[] = [];
  loading = true;
  error = '';

  constructor(
    private orgService: OrganizationService,
    private bugService: BugService,
    private scopeService: ScopeService
  ) {}

  ngOnInit() {
    this.loadDashboard();
  }

  loadDashboard() {
    this.loading = true;
    this.error = '';
    this.orgService.getMyOrganization().subscribe({
      next: org => {
        this.organization = org;
        this.approvalStatus = org.approvalStatus;
        this.loadScopes();
        this.loadBugs();
        this.loading = false;
      },
      error: err => {
        this.error = 'Failed to load organization info.';
        this.loading = false;
      }
    });
  }

  loadScopes() {
    this.scopeService.getMyScopes().subscribe({
      next: scopes => this.scopes = scopes,
      error: () => this.error = 'Failed to load scopes.'
    });
  }

  loadBugs() {
    this.bugService.getBugsForMyOrganization().subscribe({
      next: bugs => this.bugs = bugs,
      error: () => this.error = 'Failed to load bug reports.'
    });
  }

  // Add more methods for editing scopes, reviewing bugs, etc.
}
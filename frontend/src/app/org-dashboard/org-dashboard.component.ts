import { Component, OnInit } from '@angular/core';
import { OrganizationService } from '../services/organization.service';
import { BugService } from '../services/bug.service';
import { ScopeService } from '../services/scope.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-org-dashboard',
  templateUrl: './org-dashboard.component.html',
  styleUrls: ['./org-dashboard.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule]
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
        this.approvalStatus =
        this.organization?.isApproved === true ? 'approved' :
        this.organization?.isApproved === false ? 'rejected' :
        'pending';

        this.loadScopes();
        this.loadBugs();
        console.log('Loaded organization:', this.organization);
        this.loading = false;
      },
      error: err => {
        this.error = 'Failed to load organization info.';
        this.loading = false;
      }
    });
  }

  loadScopes() {
    this.scopeService.getScopesByOrganizationId(this.organization.id).subscribe({
      next: scopes => {
        this.scopes = scopes
      },
      error: () => this.error = 'Failed to load scopes.'
    });
  }

  loadBugs() {
    this.bugService.getBugsForMyOrganization(this.organization.id).subscribe({

      next: bugs => this.bugs = bugs,
      error: () => this.error = 'Failed to load bug reports.'
    });
  }

  // Add more methods for editing scopes, reviewing bugs, etc.
}
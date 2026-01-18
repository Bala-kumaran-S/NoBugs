import { Component, OnInit } from '@angular/core';
import { OrganizationService } from '../services/organization.service';
import { BugService } from '../services/bug.service';
import { ScopeService } from '../services/scope.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NotifyService } from '../services/notify.service';

@Component({
  selector: 'app-org-dashboard',
  templateUrl: './org-dashboard.component.html',
  styleUrls: ['./org-dashboard.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class OrgDashboardComponent implements OnInit {

  organization: any;
  approvalStatus = '';
  scopes: any[] = [];
  bugs: any[] = [];
  loading = true;

  private firstLoad = true;

  constructor(
    private orgService: OrganizationService,
    private bugService: BugService,
    private scopeService: ScopeService,
    private notify: NotifyService
  ) {}

  ngOnInit() {
    this.loadDashboard();
  }

  loadDashboard() {
    this.loading = true;
    this.notify.info('Loading organization dashboard...');

    this.orgService.getMyOrganization().subscribe({
      next: org => {
        this.organization = org;

        this.approvalStatus =
          org?.isApproved === true ? 'approved' :
          org?.isApproved === false ? 'rejected' :
          'pending';

        this.loadScopes();
        this.loadBugs();

        this.loading = false;

        if (this.firstLoad) {
          this.notify.success('Organization dashboard loaded');
          this.firstLoad = false;
        }
      },
      error: () => {
        this.loading = false;
        this.notify.error('Failed to load organization info.');
      }
    });
  }

  loadScopes() {
    if (!this.organization?.id) return;

    this.scopeService.getScopesByOrganizationId(this.organization.id).subscribe({
      next: scopes => {
        this.scopes = scopes;
      },
      error: () => {
        this.notify.error('Failed to load scopes.');
      }
    });
  }

  loadBugs() {
    if (!this.organization?.id) return;

    this.bugService.getBugsForMyOrganization(this.organization.id).subscribe({
      next: bugs => {
        this.bugs = bugs;
      },
      error: () => {
        this.notify.error('Failed to load bug reports.');
      }
    });
  }
}

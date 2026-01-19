import { Component, OnInit } from '@angular/core';
import { OrganizationService } from '../services/organization.service';
import { BugService } from '../services/bug.service';
import { ScopeService } from '../services/scope.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NotifyService } from '../services/notify.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-org-dashboard',
  templateUrl: './org-dashboard.component.html',
  styleUrls: ['./org-dashboard.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule]
})
export class OrgDashboardComponent implements OnInit {

  organization: any;
  approvalStatus = '';
  scopes: any[] = [];
  bugs: any[] = [];
  loading = true;

  pageSize = 5;
  currentPage = 1;

  sortField: 'submittedAt' | 'title' | 'severity' = 'submittedAt';
  sortDirection: 'asc' | 'desc' = 'desc';

  searchTerm = '';

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
          //this.notify.success('Organization dashboard loaded');
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

  get filteredBugs() {
  return this.bugs.filter(bug =>
    bug.title.toLowerCase().includes(this.searchTerm.toLowerCase())
  );
}

get sortedBugs() {
  return [...this.filteredBugs].sort((a, b) => {
    let aVal = a[this.sortField];
    let bVal = b[this.sortField];

    if (this.sortField === 'submittedAt') {
      aVal = new Date(aVal).getTime();
      bVal = new Date(bVal).getTime();
    }

    if (aVal < bVal) return this.sortDirection === 'asc' ? -1 : 1;
    if (aVal > bVal) return this.sortDirection === 'asc' ? 1 : -1;
    return 0;
  });
}

get paginatedBugs() {
  const start = (this.currentPage - 1) * this.pageSize;
  return this.sortedBugs.slice(start, start + this.pageSize);
}

get totalPages() {
  return Math.ceil(this.sortedBugs.length / this.pageSize);
}

}

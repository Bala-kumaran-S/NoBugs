import { Component, OnInit } from '@angular/core';
import { ResearchDashService, OrganizationSummary, BugReport } from '../services/research-dash.service';
import { Router } from '@angular/router';
import { ScopeService, ScopeDTO } from '../services/scope.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';
import { NotifyService } from '../services/notify.service';

@Component({
  selector: 'app-researcher-dashboard',
  templateUrl: './research-dashboard.component.html',
  styleUrls: ['./research-dashboard.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  animations: [
    trigger('listAnimation', [
      transition('* <=> *', [
        query(
          ':enter',
          [
            style({ opacity: 0, transform: 'translateY(20px)' }),
            stagger('60ms', [
              animate(
                '400ms cubic-bezier(0.35, 0, 0.25, 1)',
                style({ opacity: 1, transform: 'none' })
              )
            ])
          ],
          { optional: true }
        )
      ])
    ])
  ]
})
export class ResearchDashboardComponent implements OnInit {

  bugReports: BugReport[] = [];
  organizations: OrganizationSummary[] = [];
  filteredOrganizations: OrganizationSummary[] = [];

  loadingOrgs = true;
  loadingBugs = true;

  selectedTab: 'orgs' | 'bugs' = 'orgs';
  searchTerm = '';

  private firstOrgLoad = true;
  private firstBugLoad = true;

  constructor(
    private dashboardService: ResearchDashService,
    private scopeService: ScopeService,
    private router: Router,
    private notify: NotifyService
  ) {}

  ngOnInit() {
    this.loadOrganizations();
    this.loadMyBugs();
  }

  private loadOrganizations() {

    this.dashboardService.getPublicOrganizations().subscribe({
      next: orgs => {
        this.organizations = orgs;
        this.filteredOrganizations = orgs;
        this.loadingOrgs = false;

        if (this.firstOrgLoad) {
          //this.notify.success('Organizations loaded');
          this.firstOrgLoad = false;
        }

        // Load scopes for each organization
        this.organizations.forEach(org => {
          this.scopeService.getScopesByOrganizationId(org.id).subscribe({
            next: scopes => {
              org.scopes = scopes.map(scope => ({
                id: scope.id,
                title: scope.title,
                targetUrl: scope.targetUrl,
                description: scope.description,
                type: scope.type,
                createdAt: scope.createdAt
              }));
            },
            error: () => {
              org.scopes = [];
            }
          });
        });
      },
      error: () => {
        this.loadingOrgs = false;
        this.notify.error('Failed to load organizations.');
      }
    });
  }

  private loadMyBugs() {

    this.dashboardService.getMyBugReports().subscribe({
      next: bugs => {
        this.bugReports = bugs;
        this.loadingBugs = false;

        if (this.firstBugLoad) {
          //this.notify.success('Bug reports loaded');
          this.firstBugLoad = false;
        }
      },
      error: () => {
        this.loadingBugs = false;
        //this.notify.error('Failed to load bug reports.');
      }
    });
  }

  onSearchChange() {
    const term = this.searchTerm.trim().toLowerCase();

    this.filteredOrganizations =
      term === ''
        ? this.organizations
        : this.organizations.filter(org =>
            org.name.toLowerCase().includes(term)
          );
  }

  viewScopes(org: OrganizationSummary) {
    this.router.navigate(['/researcher/organization', org.id, 'scopes']);
  }

  reportBug(scope: ScopeDTO) {
    this.router.navigate(['/researcher/bug-report', scope.id]);
  }

  viewBug(bug: BugReport) {
    this.router.navigate(['/researcher/bugs', bug.id]);
  }

  viewScopeDetails(scopeId: number) {
  this.router.navigate(['/researcher/scopes', scopeId]);
}

}

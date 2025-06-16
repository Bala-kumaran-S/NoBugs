import { Component, OnInit } from '@angular/core';
import { ResearchDashService, OrganizationSummary, BugReport } from '../services/research-dash.service';
import { Router } from '@angular/router';
import { ScopeService, ScopeDTO } from '../services/scope.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-researcher-dashboard',
  templateUrl: './research-dashboard.component.html',
  styleUrls: ['./research-dashboard.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class ResearcherDashboardComponent implements OnInit {
  organizations: (OrganizationSummary & { scopes: ScopeDTO[] })[] = [];
  bugReports: BugReport[] = [];
  loadingOrgs = true;
  loadingBugs = true;
  errorOrgs = '';
  errorBugs = '';

  constructor(
    private dashboardService: ResearchDashService,
    private scopeService: ScopeService,
    private router: Router
  ) {}

  ngOnInit() {
    this.dashboardService.getPublicOrganizations().subscribe({
      next: orgs => {
        // For each organization, fetch its public scopes
        const enrichedOrgs = orgs.map(org => ({ ...org, scopes: [] as ScopeDTO[] }));
        this.organizations = enrichedOrgs;
        this.loadingOrgs = false;

        this.organizations.forEach(org => {
          this.scopeService.getScopesByOrganizationId(org.id).subscribe({
            next: scopes => {
              // only keep simplified scope data
              org.scopes = scopes.map(scope => ({
                id: scope.id,
                title: scope.title,
                targetUrl: scope.targetUrl,
                description: scope.description,
                type: scope.type,
                createdAt: scope.createdAt
              }));
              console.log(`Loaded scopes for organization ${org}:`, org.scopes);
            },
            error: () => {
              org.scopes = [];
            }
          });
        });
      },
      error: () => {
        this.errorOrgs = 'Failed to load organizations.';
        this.loadingOrgs = false;
      }
    });

    this.dashboardService.getMyBugReports().subscribe({
      next: bugs => {
        this.bugReports = bugs;
        this.loadingBugs = false;
      },
      error: () => {
        this.errorBugs = 'Failed to load bug reports.';
        this.loadingBugs = false;
      }
    });
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
}

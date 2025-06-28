import { Component, OnInit } from '@angular/core';
import { ResearchDashService, OrganizationSummary, BugReport } from '../services/research-dash.service';
import { Router } from '@angular/router';
import { ScopeService, ScopeDTO } from '../services/scope.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'; // <-- Add this import
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

@Component({
  selector: 'app-researcher-dashboard',
  templateUrl: './research-dashboard.component.html',
  styleUrls: ['./research-dashboard.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule], // <-- Add RouterModule here
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
  loadingOrgs = true;
  loadingBugs = true;
  errorOrgs = '';
  errorBugs = '';
  selectedTab: 'orgs' | 'bugs' = 'orgs'; // default to orgs tab
  searchTerm: string = '';
  filteredOrganizations: OrganizationSummary[] = [];
  organizations: OrganizationSummary[] = []; // Make sure this is set when you load orgs

  constructor(
    private dashboardService: ResearchDashService,
    private scopeService: ScopeService,
    private router: Router
  ) {}

  ngOnInit() {
    this.dashboardService.getPublicOrganizations().subscribe({
      next: orgs => {
        this.organizations = orgs;
        this.filteredOrganizations = orgs; // Show all by default
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

  onSearchChange() {
    const term = this.searchTerm.trim().toLowerCase();
    if (term === '') {
      // If search box is empty, show all orgs
      this.filteredOrganizations = this.organizations;
    } else {
      // Otherwise, filter by name
      this.filteredOrganizations = this.organizations.filter(org =>
        org.name.toLowerCase().includes(term)
      );
    }
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

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrgDashboardComponent } from './org-dashboard/org-dashboard.component';
import { OrgCreateComponent } from './org-create/org-create.component';
import { ResearchDashboardComponent } from './research-dashboard/research-dashboard.component';
import { AuthGuard } from './auth/auth.guard';
import { UserRegComponent } from './user-reg/user-reg.component';
import { LoginComponent } from './login/login.component';
import { UserListComponent } from './user-list/user-list.component';
import { ScopeListComponent } from './scope-list/scope-list.component';
import { ScopeAddComponent } from './scope-add/scope-add.component';
import { SubmitBugComponent } from './submit-bug/submit-bug.component';
import { BugListComponent } from './bug-list/bug-list.component';
import { BugReportReviewComponent } from './bug-report-review/bug-report-review.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AdminAuditLogsComponent } from './admin-audit-logs/admin-audit-logs.component';
import { AdminRateLimitsComponent } from './admin-rate-limits/admin-rate-limits.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { HowItWorksComponent } from './how-it-works/how-it-works.component';
import { BugViewComponent } from './bug-view/bug-view.component';
import { ContactUsComponent } from './contact-us/contact-us.component';

export const routes: Routes = [
  {
    path: 'dashboard/org',
    component: OrgDashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'dashboard/org/new',
    component: OrgCreateComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'dashboard/research',
    component: ResearchDashboardComponent,
    canActivate: [AuthGuard]
  },
  { path: 'register', component: UserRegComponent },
  { path: 'login', component: LoginComponent },

  { path: 'dashboard/org/scopes', component: ScopeListComponent },
  { path: 'dashboard/org/scopes/add', component: ScopeAddComponent },
  {
  path: 'researcher/scopes/:scopeId',
  loadComponent: () =>
    import('./view-scope/view-scope.component')
      .then(m => m.ViewScopeComponent)
},


  { path: 'dashboard/org/scopes/:id/edit', component: ScopeAddComponent },
  { path: 'dashboard/org/bugs/:id/review', component: BugReportReviewComponent },

  { path: 'researcher/bug-report/:scopeId', component: SubmitBugComponent },
  { path: 'researcher/my-bugs', component: BugListComponent },
  {
  path: 'researcher/bugs/:id',
  component: BugViewComponent
},

  { path: 'user-profile', component: UserProfileComponent },
  { path: '', component: HomePageComponent },

  { path: 'admin/audit-logs', component: AdminAuditLogsComponent },
{ path: 'admin/rate-limits', component: AdminRateLimitsComponent },
{ path: 'admin/users', component: UserListComponent },

{ path: 'forbidden', component: ErrorPageComponent, data: { code: '403', message: 'Forbidden' } },
{ path: 'not-found', component: ErrorPageComponent, data: { code: '404', message: 'Not Found' } },
{ path: 'error', component: ErrorPageComponent, data: { code: '500', message: 'Server Error' } },

{path : 'how-it-works', component: HowItWorksComponent },
{ path: 'contact-us', component: ContactUsComponent },
{ path: '**', redirectTo: 'not-found' }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}



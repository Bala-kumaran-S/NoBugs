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
import { MyBugsComponent } from './bug-list/bug-list.component';
import { BugReportReviewComponent } from './bug-report-review/bug-report-review.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { HomePageComponent } from './home-page/home-page.component';

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
  
  { path: 'users', component: UserListComponent },

  { path: 'dashboard/org/scopes', component: ScopeListComponent },
  { path: 'dashboard/org/scopes/add', component: ScopeAddComponent },
  { path: 'dashboard/org/scopes/:id/edit', component: ScopeAddComponent },
  { path: 'dashboard/org/bugs/:id/review', component: BugReportReviewComponent },

  { path: 'researcher/bug-report/:scopeId', component: SubmitBugComponent },
  { path: 'researcher/my-bugs', component: MyBugsComponent },
  
  { path: 'user-profile', component: UserProfileComponent },
  { path: '', component: HomePageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}



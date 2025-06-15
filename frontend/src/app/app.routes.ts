import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrgDashboardComponent } from './org-dashboard/org-dashboard.component';
import { OrgCreateComponent } from './org-create/org-create.component';
import { ResearcherDashboardComponent } from './research-dashboard/research-dashboard.component';
import { AuthGuard } from './auth/auth.guard';
import { UserRegComponent } from './user-reg/user-reg.component';
import { LoginComponent } from './login/login.component';
import { UserListComponent } from './user-list/user-list.component';
import { ScopeListComponent } from './scope-list/scope-list.component';
import { ScopeAddComponent } from './scope-add/scope-add.component';

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
    component: ResearcherDashboardComponent,
    canActivate: [AuthGuard]
  },
  { path: 'register', component: UserRegComponent },
  { path: 'login', component: LoginComponent },
  { path: 'users', component: UserListComponent },
  { path: 'org/scopes', component: ScopeListComponent },
  { path: 'org/scopes/add', component: ScopeAddComponent },
  { path: 'org/scopes/:id/edit', component: ScopeAddComponent },
  { path: '', redirectTo: '/register', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}



import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrgDashboardComponent } from './org-dashboard/org-dashboard.component';
import { ResearcherDashboardComponent } from './research-dashboard/research-dashboard.component';
import { AuthGuard } from './auth/auth.guard';
import { UserRegComponent } from './user-reg/user-reg.component';
import { LoginComponent } from './login/login.component';
import { UserListComponent } from './user-list/user-list.component';

export const routes: Routes = [
  {
    path: 'dashboard/org',
    component: OrgDashboardComponent,
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
  { path: '', redirectTo: '/register', pathMatch: 'full' },
];



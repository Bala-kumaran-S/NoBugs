import { Routes } from '@angular/router';
import { UserRegComponent } from './user-reg/user-reg.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  { path: 'register', component: UserRegComponent },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/register', pathMatch: 'full' },
];

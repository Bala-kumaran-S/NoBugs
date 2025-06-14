import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
      return false;
    }
    // Optionally, check token expiration here
    return true;
  }
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private router: Router) {}

  login(token: string) {
    localStorage.setItem('token', token);
    const payload = JSON.parse(atob(token.split('.')[1]));
    const role = payload.role; // Make sure your JWT includes the role claim

    if (role === 'ORGANIZATION') {
      this.router.navigate(['/dashboard/org']);
    } else if (role === 'RESEARCHER') {
      this.router.navigate(['/dashboard/researcher']);
    }
  }
}
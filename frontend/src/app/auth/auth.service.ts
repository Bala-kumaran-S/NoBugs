import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private router: Router) {}

  login(token: string) {
    localStorage.setItem('token', token);
    const payload = JSON.parse(atob(token.split('.')[1]));
    const role = payload.role;

    if (role === 'ORGANIZATION') {
      this.router.navigate(['/dashboard/org']);
    } else if (role === 'RESEARCHER') {
      this.router.navigate(['/dashboard/researcher']);
    } else {
      this.router.navigate(['/']);
    }
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getRole(): string | null {
    const token = this.getToken();
    if (!token) return null;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.role;
    } catch {
      return null;
    }
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

 isAuthenticated(): boolean {
  return this.isLoggedIn();
}
}
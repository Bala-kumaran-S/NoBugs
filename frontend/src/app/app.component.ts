import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, RouterModule, RouterOutlet } from '@angular/router';
import { UserRegComponent } from './user-reg/user-reg.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
import { filter } from 'rxjs/operators';
import { NgIf } from '@angular/common';
import { AuthService } from './auth/auth.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    UserRegComponent,
    ReactiveFormsModule,
    RouterModule,
    NgIf,
    HttpClientModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ]
})
export class AppComponent implements OnInit {

  title = 'Nobugs';

  hasToken = false;
  userRole: string | null = null;
  username = '';
  reputation = 0;

  constructor(
    private router: Router,
    private http: HttpClient,
    public auth: AuthService,
    private userService: UserService
  ) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.refreshUser();
      });
  }

  ngOnInit() {
    this.refreshUser();
  }

  refreshUser() {
  this.hasToken = this.auth.isLoggedIn();

  if (!this.hasToken) {
    this.userRole = null;
    this.username = '';
    this.reputation = 0;
    return;
  }

  const jwtUser = this.auth.getUserInfo();   // contains sub, role
  const email = jwtUser?.sub;

  if (!email) return;

  this.userRole = jwtUser.role;

  this.userService.getUserDTO(email).subscribe({
    next: (user) => {
      this.username = user.username;
      this.reputation = user.reputationPoints;
      console.log('User refreshed from API:', user);
    },
    error: (err) => {
      console.error('Failed to load user profile', err);
    }
  });
}


  logout() {
    const token = localStorage.getItem('token');

    this.http.post(
      'http://localhost:8080/api/auth/logout',
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    ).subscribe(() => {
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      this.refreshUser();
      this.router.navigate(['/login']);
    });
  }
}

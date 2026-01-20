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
import { NotifyService } from './services/notify.service';
import { OrganizationService } from './services/organization.service';
import { environment } from '../environment/environment';

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
  hasOrganization = false;


  private profileLoadFailed = false;

  constructor(
    private router: Router,
    private http: HttpClient,
    public auth: AuthService,
    private userService: UserService,
    private notify: NotifyService,
    private orgService: OrganizationService
  ) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.refreshUser();
      });
  }

  ngOnInit() {
  this.checkOrganization();
}


  checkOrganization() {
  this.orgService.getMyOrganization().subscribe({
    next: (org) => {
      console.log('ORG FOUND', org);
      this.hasOrganization = true;
    },
    error: (err) => {
      console.log('NO ORG', err.status);
      this.hasOrganization = false;
    }
  });
}



  refreshUser() {
    this.hasToken = this.auth.isLoggedIn();

    if (!this.hasToken) {
      this.userRole = null;
      this.username = '';
      this.reputation = 0;
      this.profileLoadFailed = false;
      return;
    }

    const jwtUser = this.auth.getUserInfo();
    const email = jwtUser?.sub;

    if (!email) return;

    this.userRole = jwtUser.role;

    this.userService.getUserDTO(email).subscribe({
      next: (user) => {
        this.username = user.username;
        this.reputation = user.reputationPoints;
        this.profileLoadFailed = false;
      },
      error: () => {
        // avoid spamming snackbar on every navigation
        if (!this.profileLoadFailed) {
          //this.notify.error('Failed to load user profile.');
          this.profileLoadFailed = true;
        }
      }
    });
  }

  logout() {
    const token = localStorage.getItem('token');

    this.notify.info('Signing out...');

    this.http.post(
      `${environment.apiBaseUrl}/api/auth/logout`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    ).subscribe({
      next: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        this.refreshUser();

        //this.notify.success('Logged out');
        this.router.navigate(['/login']);
      },
      error: () => {
        // even if backend fails, clear local session
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        this.refreshUser();

        this.notify.info('Session cleared locally');
        this.router.navigate(['/login']);
      }
    });
  }
}

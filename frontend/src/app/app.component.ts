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
    this.resetUserState();
    this.refreshUser();
  }

  refreshUser() {
    this.hasToken = this.auth.hasValidToken();

    if (!this.hasToken) {
      this.resetUserState();
      return;
    }

    const jwtUser = this.auth.getUserInfo();
    if (!jwtUser || !jwtUser.sub || !jwtUser.role) {
      this.resetUserState();
      return;
    }

    this.userRole = jwtUser.role;

    this.userService.getUserDTO(jwtUser.sub).subscribe({
      next: (user) => {
        this.username = user.username;
        this.reputation = user.reputationPoints;

        if (this.userRole === 'ORGANIZATION') {
          this.checkOrganization();
        }
      },
      error: () => {
        this.resetUserState();
      }
    });
  }

  checkOrganization() {
    this.orgService.getMyOrganization().subscribe({
      next: () => {
        this.hasOrganization = true;
      },
      error: () => {
        this.hasOrganization = false;
      }
    });
  }

  resetUserState() {
    this.hasToken = false;
    this.userRole = null;
    this.username = '';
    this.reputation = 0;
    this.hasOrganization = false;
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
        this.resetUserState();
        this.router.navigate(['/login']);
      },
      error: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        this.resetUserState();
        this.router.navigate(['/login']);
      }
    });
  }
}

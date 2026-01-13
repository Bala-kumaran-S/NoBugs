import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, RouterModule, RouterOutlet } from '@angular/router';
import { UserRegComponent } from './user-reg/user-reg.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
import { filter } from 'rxjs/operators';
import { NgIf } from '@angular/common';

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

  title = 'frontend';
  hasToken = false;

  constructor(
    private router: Router,
    private http: HttpClient 
  ) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.setAuthFlags();
    });
  }

  ngOnInit() {
    this.setAuthFlags();
  }

  setAuthFlags() {
    this.hasToken = !!localStorage.getItem('token');
    console.log('hasToken:', this.hasToken);
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
  });
}


}

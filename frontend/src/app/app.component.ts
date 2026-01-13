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
    private http: HttpClient   // ✅ inject HttpClient
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
  console.log("Calling backend logout...");

  this.http.post('/api/auth/logout', {}).subscribe({
    next: () => console.log("Backend logout OK"),
    error: (e) => console.log("Backend logout ERROR", e),
    complete: () => {
      localStorage.removeItem('token');
      //this.router.navigate(['/login']);
    }
  });
}

}

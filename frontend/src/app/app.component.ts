import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { RouterModule, RouterOutlet } from '@angular/router';
import { UserRegComponent } from './user-reg/user-reg.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
import { filter } from 'rxjs/operators';
 import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, UserRegComponent, ReactiveFormsModule, RouterModule, NgIf],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
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

  // This property is used in the template for dropdown logic
  hasToken = false;

  constructor(private router: Router) {
    // Update hasToken on every route change
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.setAuthFlags();
      // console.log('Route changed, updated auth flags:', this.hasToken);
    });
  }

  ngOnInit() {
    this.setAuthFlags();
  }

  setAuthFlags() {
    // console.log('Setting auth flags based on localStorage token', localStorage.getItem('token'));
    this.hasToken = !!localStorage.getItem('token');
    console.log('hasToken:', this.hasToken);
  }

  logout() {
    localStorage.removeItem('token');
    this.setAuthFlags();
    this.router.navigate(['/login']);
  }
}

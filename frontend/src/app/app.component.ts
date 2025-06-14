import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserRegComponent } from './user-reg/user-reg.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, UserRegComponent, ReactiveFormsModule],
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
export class AppComponent {
  title = 'frontend';

  constructor(private router: Router) {}

  logout() {
    localStorage.removeItem('token'); // or sessionStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}

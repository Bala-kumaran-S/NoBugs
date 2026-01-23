import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UserDTO } from '../services/user.service';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from '../../environment/environment';  
import { NotifyService } from '../services/notify.service';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  standalone: true,
  imports: [CommonModule, HttpClientModule],

})
export class UserProfileComponent implements OnInit {

  user: UserDTO | null = null; // <-- Add this line

  defaultProfileImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2nhWBc7DS2jvf_JW8hoy1U_WR9b_If5ZzCw&s'; // Placeholder image URL
  constructor(private userService: UserService, private router: Router, private http: HttpClient, private notify: NotifyService) { }
  
  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const email = payload.email || payload.sub; // fallback to sub if email not present
      this.fetchUserData(email);
    } else {
      console.error('No token found in localStorage');
    }
  }

  fetchUserData(email: string) {
    this.userService.getUserDTO(email).subscribe(
      (userData) => {
        this.user = userData; // <-- Assign the fetched data here
        if (!this.user.profileImage) {
          this.user.profileImage = this.defaultProfileImage;
        }
        console.log('User data fetched successfully:', this.user);
      },
      (error) => {
        console.error('Error fetching user data:', error);
      }
    );
  }

  updateProf() {
    this.router.navigate(['/profile/edit']);
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
  
          //this.notify.success('Logged out');
          this.router.navigate(['/login']);
        },
        error: () => {
          // even if backend fails, clear local session
          localStorage.removeItem('token');
          localStorage.removeItem('refreshToken');
  
          this.notify.info('Session cleared locally');
          this.router.navigate(['/login']);
        }
      });
    }

}

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UserDTO } from '../services/user.service';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class UserProfileComponent implements OnInit {

  user: UserDTO | null = null; // <-- Add this line

  defaultProfileImage = 'https://ui-avatars.com/api/?name=User&background=00c6ff&color=fff&size=128';

  constructor(private userService: UserService, private router: Router) { }
  
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

  logout() {
    localStorage.removeItem('token');
    this.user = null; // Clear user data on logout
    console.log('User logged out successfully');
    this.router.navigate(['/login']);
  }
}

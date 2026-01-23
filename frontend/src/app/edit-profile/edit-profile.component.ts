import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { UserDTO, UserService } from '../services/user.service';
import { NotifyService } from '../services/notify.service';
import { environment } from '../../environment/environment';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  user: UserDTO | null = null;
  loading = false;

  constructor(
    private userService: UserService,
    private http: HttpClient,
    private notify: NotifyService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');

    if (!token) {
      this.router.navigate(['/login']);
      return;
    }

    const payload = JSON.parse(atob(token.split('.')[1]));
    const email = payload.email || payload.sub;

    this.userService.getUserDTO(email).subscribe({
      next: (data) => {
        this.user = { ...data }; // clone to avoid side-effects
      },
      error: () => {
        this.notify.error('Failed to load profile');
      }
    });
  }

  updateProfile() {
  if (!this.user) return;

  this.loading = true;

  this.userService.updateUser(this.user).subscribe({
    next: () => {
      
      this.notify.success('Profile updated successfully');
      this.router.navigate(['/user-profile']);
    },
    error: (err) => {
      console.error(err);
      this.notify.error('Profile update failed');
      this.loading = false;
    }
  });
}



  cancel() {
    this.router.navigate(['/user-profile']);
  }
}

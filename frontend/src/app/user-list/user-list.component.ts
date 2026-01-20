import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { environment } from '../../environment/environment';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
  standalone: true,
  imports: [CommonModule, HttpClientModule]
})
export class UserListComponent implements OnInit {
  users: any[] = [];
  error: string | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    this.http.get<any[]>(`${environment.apiBaseUrl}/api/users`, { headers :{Authorization : `Bearer ${token}`}}).subscribe({
      next: (data) => this.users = data,
      error: (err) => this.error = 'Failed to load users'
    });
  }
}
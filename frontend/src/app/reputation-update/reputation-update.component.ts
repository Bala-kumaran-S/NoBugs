import { Component, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reputation-update',
  templateUrl: `./reputation-update.component.html`,
  standalone: true,
  imports: [FormsModule]
})
export class ReputationUpdateComponent {
  @Input() userId!: number;
  points: number = 0;
  success = '';
  error = '';

  constructor(private http: HttpClient) {}

  updateReputation() {
    this.success = '';
    this.error = '';
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    this.http.put(`http://localhost:8080/api/users/${this.userId}/reputation`, { points: this.points }, { headers })
      .subscribe({
        next: () => this.success = 'Reputation updated!',
        error: () => this.error = 'Failed to update reputation.'
      });
  }
}
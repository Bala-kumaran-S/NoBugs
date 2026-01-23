import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';


export interface UserDTO {
  id?: number;
  username: string;
  email: string;
  role: string;
  reputationPoints: number;
  registeredAt: string;
  profileImage?: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUserDTO(email: string): Observable<UserDTO> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.get<UserDTO>(`${environment.apiBaseUrl}/api/users/email/${email}`, { headers });
  }

  updateUser(user: UserDTO): Observable<UserDTO> {
    if (!user.id) {
      throw new Error('User ID is required for update');
    }

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.put<UserDTO>(
      `${environment.apiBaseUrl}/api/users/${user.id}`,
      user,
      { headers }
    );
  }
}

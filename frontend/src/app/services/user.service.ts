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
}

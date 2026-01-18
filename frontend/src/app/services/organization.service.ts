import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Organization {
  isApproved: boolean;
  id: number;
  name: string;
  email: string;
  description: string;
  approvalStatus: string;
  registeredAt: string;
}

@Injectable({ providedIn: 'root' })
export class OrganizationService {
  private apiUrl = 'http://localhost:8080/api/orgs';
  
  constructor(private http: HttpClient) {}

  get token(): string | null {
    return localStorage.getItem('token');
  }

  getMyOrganization(): Observable<Organization> {
    return this.http.get<Organization>(`${this.apiUrl}/me`, { headers :{Authorization : `Bearer ${this.token}`}});
  }
  
  updateOrganization(data: Partial<Organization>): Observable<Organization> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    });
    return this.http.put<Organization>(`${this.apiUrl}/me`, data, { headers });
  }

  registerOrganization(data: Partial<Organization>): Observable<Organization> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    });
    return this.http.post<Organization>(`${this.apiUrl}/register`, data , { headers });
  }
}

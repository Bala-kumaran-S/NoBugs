import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Organization {
  id: number;
  name: string;
  email: string;
  description: string;
  approvalStatus: string;
  registeredAt: string;
}

@Injectable({ providedIn: 'root' })
export class OrganizationService {
  private apiUrl = '/api/organization';

  constructor(private http: HttpClient) {}

  getMyOrganization(): Observable<Organization> {
    return this.http.get<Organization>(`${this.apiUrl}/me`);
  }

  updateOrganization(data: Partial<Organization>): Observable<Organization> {
    return this.http.put<Organization>(`${this.apiUrl}/me`, data);
  }

  registerOrganization(data: Partial<Organization>): Observable<Organization> {
    return this.http.post<Organization>(`${this.apiUrl}/register`, data);
  }
}

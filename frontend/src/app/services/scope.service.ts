import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ScopeDTO {
  id: number;
  organizationId?: number;
  title: string;
  targetUrl: string;
  description?: string;
  inScopeRules?: string;
  outOfScopeRules?: string;
  type: 'PUBLIC' | 'PRIVATE';
  createdAt?: string;
  lastUpdatedAt?: string;
}

@Injectable({ providedIn: 'root' })
export class ScopeService {
  private apiUrl = 'http://localhost:8080/api/scopes';

  constructor(private http: HttpClient) {}

  getScopes(): Observable<ScopeDTO[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.get<ScopeDTO[]>(this.apiUrl, { headers });
  }

  addScope(scope: ScopeDTO): Observable<ScopeDTO> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.post<ScopeDTO>("http://localhost:8080/api/orgs/scopes", scope, { headers });
  }

  updateScope(id: number, scope: ScopeDTO): Observable<ScopeDTO> {
    const token = localStorage.getItem('token');
     


                                                                     
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.put<ScopeDTO>(`${this.apiUrl}/${id}`, scope, { headers });
  }

  deleteScope(id: number): Observable<void> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers });
  }

  getScopeById(id: number): Observable<ScopeDTO> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.get<ScopeDTO>(`${this.apiUrl}/${id}`, { headers });
  }

  getScopesByOrganizationId(orgId: number): Observable<ScopeDTO[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.get<ScopeDTO[]>(`${this.apiUrl}/org/${orgId}`, { headers });
  }
}

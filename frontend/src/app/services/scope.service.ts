import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Scope {
  id: number;
  name: string;
  description: string;
}

@Injectable({ providedIn: 'root' })
export class ScopeService {
  private apiUrl = '/api/organization/scopes';

  constructor(private http: HttpClient) {}

  getMyScopes(): Observable<Scope[]> {
    return this.http.get<Scope[]>(this.apiUrl);
  }

  addScope(scope: Partial<Scope>): Observable<Scope> {
    return this.http.post<Scope>(this.apiUrl, scope);
  }

  editScope(scopeId: number, scope: Partial<Scope>): Observable<Scope> {
    return this.http.put<Scope>(`${this.apiUrl}/${scopeId}`, scope);
  }

  deleteScope(scopeId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${scopeId}`);
  }
}

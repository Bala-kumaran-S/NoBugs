import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface OrganizationSummary {
  id: number;
  name: string;
  description: string;
  scopes: ScopeSummary[];
}

export interface ScopeSummary {
  id: number;
  title: string;
  targetUrl: string;
  type: string;
}

export interface BugReport {
  id: number;
  title: string;
  scopeTitle: string;
  organizationName: string;
  status: string;
  severity?: string;
  submittedAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class ResearchDashService {
  private orgsUrl = 'http://localhost:8080/api/orgs/public';
  private myBugsUrl = 'http://localhost:8080/api/researcher/bugs';

  constructor(private http: HttpClient) { }

  getPublicOrganizations(): Observable<OrganizationSummary[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.get<OrganizationSummary[]>(this.orgsUrl, { headers });
  }

  getMyBugReports(): Observable<BugReport[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.get<BugReport[]>(this.myBugsUrl, { headers });
  }
}

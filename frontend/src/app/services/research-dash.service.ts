import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';

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
  id?: number;
  uniqueId?: string;
  scopeId: number;
  scopeTitle?: string;
  organizationName?: string;
  reporter?: number;
  title: string;
  description: string;
  reporterSeverity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  adminSeverity?: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  affectedEndpoint?: string;
  stepsToReproduce: string;
  attachmentUrl1?: string;
  submittedAt?: string;
  status?: 'SUBMITTED' | 'IN_REVIEW' | 'ACCEPTED' | 'INVALID' | 'DUPLICATE' | 'INFORMATIONAL' | 'NOT_APPLICABLE';
  adminNotes?: string;

}

@Injectable({
  providedIn: 'root'
})
export class ResearchDashService {
  private orgsUrl = `${environment.apiBaseUrl}/api/orgs/public`;
  private myBugsUrl = `${environment.apiBaseUrl}/api/researcher/bugs`;

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

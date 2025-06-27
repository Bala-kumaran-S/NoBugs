import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface BugReportDTO {
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
  status?: string;
  adminNotes?: string;
}

@Injectable({ providedIn: 'root' })
export class BugService {
  private apiUrl = 'http://localhost:8080/api/researcher/bugs';

  constructor(private http: HttpClient) {}

  submitBug(bug: BugReportDTO): Observable<BugReportDTO> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.post<BugReportDTO>(this.apiUrl, bug, { headers });
  }

  getMyBugs(): Observable<BugReportDTO[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.get<BugReportDTO[]>(this.apiUrl, { headers });
  }

  getBugById(id: number): Observable<BugReportDTO> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.get<BugReportDTO>(`${this.apiUrl}/${id}`, { headers });
  }

  getBugsForMyOrganization(id: number): Observable<BugReportDTO[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.get<BugReportDTO[]>(`${this.apiUrl}/org/${id}`, { headers });
  }

  updateBug(id: number, bug: BugReportDTO): Observable<BugReportDTO> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.put<BugReportDTO>(`${this.apiUrl}/${id}`, bug, { headers });
  }
}
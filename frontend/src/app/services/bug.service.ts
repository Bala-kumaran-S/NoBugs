import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Bug {
  id: number;
  title: string;
  scopeName: string;
  researcherName: string;
  status: string;
  severity: string;
  submittedAt: string;
  notes?: string;
}

@Injectable({ providedIn: 'root' })
export class BugService {
  private apiUrl = '/api/organization/bugs';

  constructor(private http: HttpClient) {}

  getBugsForMyOrganization(): Observable<Bug[]> {
    return this.http.get<Bug[]>(this.apiUrl);
  }

  getBugById(bugId: number): Observable<Bug> {
    return this.http.get<Bug>(`${this.apiUrl}/${bugId}`);
  }

  reviewBug(bugId: number, reviewData: { severity: string; notes: string; reputationPoints: number }): Observable<Bug> {
    return this.http.post<Bug>(`${this.apiUrl}/${bugId}/review`, reviewData);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environment/environment';

@Injectable({ providedIn: 'root' })
export class AdminService {

  private base = `${environment.apiBaseUrl}/api/admin`;


  constructor(private http: HttpClient) {}

  // Audit logs
  getAuditLogs(page = 0, size = 20) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.get<any>(`${this.base}/audit-logs?page=${page}&size=${size}`,{ headers });
  }

  // Rate limits
  getBlockedIps() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.get<string[]>(`${this.base}/rate-limits`, { headers });
  }

  unblockIp(ip: string) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.delete(`${this.base}/rate-limits/${ip}`, { headers });
  }
}

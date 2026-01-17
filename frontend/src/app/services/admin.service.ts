import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AdminService {

  private base = 'http://localhost:8080/api/admin';


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

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../services/admin.service';

@Component({
  standalone: true,
  selector: 'app-admin-audit-logs',
  imports: [CommonModule],
  templateUrl: './admin-audit-logs.component.html',
  styleUrl: './admin-audit-logs.component.css'
})
export class AdminAuditLogsComponent implements OnInit {

  logs: any[] = [];
  page = 0;
  totalPages = 0;

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.adminService.getAuditLogs(this.page).subscribe(res => {
      this.logs = res.content;
      this.totalPages = res.totalPages;
    });
  }

  next() {
    if (this.page + 1 < this.totalPages) {
      this.page++;
      this.load();
    }
  }

  prev() {
    if (this.page > 0) {
      this.page--;
      this.load();
    }
  }
}

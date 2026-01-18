import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../services/admin.service';
import { NotifyService } from '../services/notify.service';

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
  private firstLoad = true;

  constructor(
    private adminService: AdminService,
    private notify: NotifyService
  ) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.notify.info('Loading audit logs...');

    this.adminService.getAuditLogs(this.page).subscribe({
      next: res => {
        this.logs = res.content;
        this.totalPages = res.totalPages;

        if (this.firstLoad) {
          this.notify.success('Audit logs loaded');
          this.firstLoad = false;
        }
      },
      error: () => {
        this.notify.error('Failed to load audit logs.');
      }
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

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../services/admin.service';
import { NotifyService } from '../services/notify.service';

@Component({
  standalone: true,
  selector: 'app-admin-rate-limits',
  imports: [CommonModule],
  templateUrl: './admin-rate-limits.component.html',
  styleUrls: ['./admin-rate-limits.component.css']
})
export class AdminRateLimitsComponent implements OnInit {

  ips: string[] = [];
  private firstLoad = true;

  constructor(
    private adminService: AdminService,
    private notify: NotifyService
  ) {}

  ngOnInit() {
    this.load();
  }

  load() {
    //this.notify.info('Loading blocked IPs...');

    this.adminService.getBlockedIps().subscribe({
      next: data => {
        this.ips = data;

        if (this.firstLoad) {
          //this.notify.success('Rate limit data loaded');
          this.firstLoad = false;
        }
      },
      error: () => {
        this.notify.error('Failed to load blocked IPs.');
      }
    });
  }

  unblock(ip: string) {
    this.notify.info(`Unblocking ${ip}...`);

    this.adminService.unblockIp(ip).subscribe({
      next: () => {
        this.notify.success(`IP ${ip} unblocked`);
        this.load();
      },
      error: () => {
        this.notify.error(`Failed to unblock ${ip}`);
      }
    });
  }
}

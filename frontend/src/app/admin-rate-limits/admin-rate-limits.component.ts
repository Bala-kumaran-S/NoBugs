import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../services/admin.service';

@Component({
  standalone: true,
  selector: 'app-admin-rate-limits',
  imports: [CommonModule],
  templateUrl: './admin-rate-limits.component.html',
  styleUrls: ['./admin-rate-limits.component.css']
})

export class AdminRateLimitsComponent implements OnInit {

  ips: string[] = [];

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.adminService.getBlockedIps().subscribe(data => {
      this.ips = data;
    });
  }

  unblock(ip: string) {
    this.adminService.unblockIp(ip).subscribe(() => {
      this.load();
    });
  }
}

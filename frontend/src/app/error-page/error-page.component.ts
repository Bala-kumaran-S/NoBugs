import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { NotifyService } from '../services/notify.service';

@Component({
  standalone: true,
  selector: 'app-error-page',
  imports: [CommonModule],
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css']
})
export class ErrorPageComponent implements OnInit {

  code = '404';
  message = 'Not Found';

  constructor(
    private route: ActivatedRoute,
    private notify: NotifyService
  ) {}

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.code = data['code'] || '404';
      this.message = data['message'] || 'Not Found';

      // Show once as overlay feedback
      if (this.code.startsWith('4')) {
        this.notify.info(`${this.code} – ${this.message}`);
      } else {
        this.notify.error(`${this.code} – ${this.message}`);
      }
    });
  }
}

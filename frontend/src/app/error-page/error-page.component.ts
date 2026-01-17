import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-error-page',
  imports: [CommonModule],
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css']
})
export class ErrorPageComponent {

  code = '404';
  message = 'Not Found';

  constructor(route: ActivatedRoute) {
    route.data.subscribe(data => {
      this.code = data['code'];
      this.message = data['message'];
    });
  }
}

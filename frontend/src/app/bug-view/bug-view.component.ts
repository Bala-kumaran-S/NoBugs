import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BugService, BugReportDTO } from '../services/bug.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bug-view',
  templateUrl: './bug-view.component.html',
  styleUrls: ['./bug-view.component.css'],
  standalone: true,
  imports: [RouterModule, CommonModule]

})
export class BugViewComponent implements OnInit {

  bug?: BugReportDTO;
  loading = true;
  error?: string;

  constructor(
    private route: ActivatedRoute,
    private bugService: BugService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (!id) {
      this.error = 'Invalid bug ID';
      this.loading = false;
      return;
    }

    this.bugService.getBugById(id).subscribe({
      next: (data) => {
        this.bug = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Bug not found or access denied';
        this.loading = false;
      }
    });
  }

  goBack() {
    this.router.navigate(['/researcher/my-bugs']);
  }
}

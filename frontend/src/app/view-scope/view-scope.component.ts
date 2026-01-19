import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ScopeService, ScopeDTO } from '../services/scope.service';
import { NotifyService } from '../services/notify.service';

@Component({
  selector: 'app-view-scope',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-scope.component.html',
  styleUrls: ['./view-scope.component.css']
})
export class ViewScopeComponent implements OnInit {

  scope?: ScopeDTO;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private scopeService: ScopeService,
    private router: Router,
    private notify: NotifyService
  ) {}

  ngOnInit() {
    const scopeId = Number(this.route.snapshot.paramMap.get('scopeId'));
    this.loadScope(scopeId);
  }

  loadScope(id: number) {
    this.scopeService.getScopeById(id).subscribe({
      next: scope => {
        this.scope = scope;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.notify.error('Failed to load scope details.');
      }
    });
  }

  reportBug() {
    if (!this.scope) return;
    this.router.navigate(['/researcher/bug-report', this.scope.id]);
  }

  goBack() {
    this.router.navigate(['/dashboard/research']);
  }
}

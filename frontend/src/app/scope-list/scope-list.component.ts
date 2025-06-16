import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ScopeService, ScopeDTO } from '../services/scope.service';

@Component({
  selector: 'app-scope-list',
  templateUrl: './scope-list.component.html',
  styleUrls: ['./scope-list.component.css']
})
export class ScopeListComponent implements OnInit {
  scopes: ScopeDTO[] = [];
  loading = true;
  error = '';

  constructor(private scopeService: ScopeService, private router: Router) {}

  ngOnInit() {
    this.loadScopes();
  }

  loadScopes() {
    this.loading = true;
    this.scopeService.getScopes().subscribe({
      next: scopes => {
        this.scopes = scopes;
        this.loading = false;
      },
      error: err => {
        this.error = 'Failed to load scopes.';
        this.loading = false;
      }
    });
  }

  onEdit(scope: ScopeDTO) {
    this.router.navigate(['/org/scopes', scope.id, 'edit']);
  }

  onDelete(scope: ScopeDTO) {
    if (confirm(`Delete scope "${scope.title}"?`)) {
      this.scopeService.deleteScope(scope.id!).subscribe({
        next: () => this.loadScopes(),
        error: () => this.error = 'Failed to delete scope.'
      });
    }
  }
}

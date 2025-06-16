import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ScopeService, ScopeDTO } from '../services/scope.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-scope-add',
  templateUrl: './scope-add.component.html',
  styleUrls: ['./scope-add.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule]
})
export class ScopeAddComponent implements OnInit {
  scopeForm: FormGroup;
  submitted = false;
  error = '';
  success = '';
  isEdit = false;
  scopeId?: number;

  constructor(
    private fb: FormBuilder,
    private scopeService: ScopeService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.scopeForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(255)]],
      targetUrl: ['', [Validators.required, Validators.maxLength(2048)]],
      description: [''],
      inScopeRules: [''],
      outOfScopeRules: [''],
      type: ['PUBLIC', Validators.required]
    });
  }

  ngOnInit() {
    this.scopeId = Number(this.route.snapshot.paramMap.get('id'));
    this.isEdit = !!this.scopeId;
    if (this.isEdit) {
      this.scopeService.getScopeById(this.scopeId!).subscribe({
        next: scope => this.scopeForm.patchValue(scope),
        error: () => this.error = 'Failed to load scope.'
      });
    }
  }

  get f() { return this.scopeForm.controls; }

  onSubmit() {
    this.submitted = true;
    this.error = '';
    this.success = '';

    if (this.scopeForm.invalid) return;

    const scope: ScopeDTO = this.scopeForm.value;
    if (this.isEdit) {
      this.scopeService.updateScope(this.scopeId!, scope).subscribe({
        next: () => {
          this.success = 'Scope updated!';
          setTimeout(() => this.router.navigate(['/org/scopes']), 1000);
        },
        error: err => this.error = err.error?.message || 'Failed to update scope.'
      });
    } else {
      this.scopeService.addScope(scope).subscribe({
        next: () => {
          this.success = 'Scope added!';
          setTimeout(() => this.router.navigate(['/dashboard/org']), 1000);
        },
        error: err => this.error = err.error?.message || 'Failed to add scope.'
      });
    }
  }
}

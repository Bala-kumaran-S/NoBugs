import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ScopeService, ScopeDTO } from '../services/scope.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NotifyService } from '../services/notify.service';

@Component({
  selector: 'app-scope-add',
  templateUrl: './scope-add.component.html',
  styleUrls: ['./scope-add.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule]
})
export class ScopeAddComponent implements OnInit {
  scopeForm: FormGroup;
  submitted = false;
  isEdit = false;
  scopeId?: number;

  constructor(
    private fb: FormBuilder,
    private scopeService: ScopeService,
    private route: ActivatedRoute,
    private router: Router,
    private notify: NotifyService
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
        error: () => this.notify.error('Failed to load scope.')
      });
    }
  }

  get f() { return this.scopeForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.scopeForm.invalid) return;

    const scope: ScopeDTO = this.scopeForm.value;
    if (this.isEdit) {
      this.scopeService.updateScope(this.scopeId!, scope).subscribe({
        next: () => {
          this.notify.success('Scope updated!');
          setTimeout(() => this.router.navigate(['/org/scopes']), 1000);
        },
        error: err => this.notify.error(err.error?.message || 'Failed to update scope.')
      });
    } else {
      this.scopeService.addScope(scope).subscribe({
        next: () => {
          //this.notify.success('Scope added!');
          setTimeout(() => this.router.navigate(['/dashboard/org']), 1000);
        },
        error: err => this.notify.error(err.error?.message || 'Failed to add scope.')
      });
    }
  }
}

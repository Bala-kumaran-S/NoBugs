import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRateLimitsComponent } from './admin-rate-limits.component';

describe('AdminRateLimitsComponent', () => {
  let component: AdminRateLimitsComponent;
  let fixture: ComponentFixture<AdminRateLimitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminRateLimitsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminRateLimitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

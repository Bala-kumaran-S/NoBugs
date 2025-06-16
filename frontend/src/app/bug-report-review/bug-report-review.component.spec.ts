import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BugReportReviewComponent } from './bug-report-review.component';

describe('BugReportReviewComponent', () => {
  let component: BugReportReviewComponent;
  let fixture: ComponentFixture<BugReportReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BugReportReviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BugReportReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

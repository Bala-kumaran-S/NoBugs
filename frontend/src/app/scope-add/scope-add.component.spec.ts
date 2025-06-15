import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScopeAddComponent } from './scope-add.component';

describe('ScopeAddComponent', () => {
  let component: ScopeAddComponent;
  let fixture: ComponentFixture<ScopeAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScopeAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScopeAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

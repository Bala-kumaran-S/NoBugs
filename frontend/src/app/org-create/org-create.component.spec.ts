
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgCreateComponent } from './org-create.component';

describe('OrgCreateComponent', () => {
  let component: OrgCreateComponent;
  let fixture: ComponentFixture<OrgCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrgCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrgCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRegComponent } from './user-reg.component';

describe('UserRegComponent', () => {
  let component: UserRegComponent;
  let fixture: ComponentFixture<UserRegComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserRegComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserRegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

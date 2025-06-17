import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReputationUpdateComponent } from './reputation-update.component';

describe('RepudationUpdateComponent', () => {
  let component: ReputationUpdateComponent;
  let fixture: ComponentFixture<ReputationUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReputationUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReputationUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

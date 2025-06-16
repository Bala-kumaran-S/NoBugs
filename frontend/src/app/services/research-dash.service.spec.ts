import { TestBed } from '@angular/core/testing';

import { ResearchDashService } from './research-dash.service';

describe('ResearchDashService', () => {
  let service: ResearchDashService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResearchDashService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

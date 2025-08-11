import { TestBed } from '@angular/core/testing';

import { MicroAnimationsService } from './micro-animations.service';

describe('MicroAnimationsService', () => {
  let service: MicroAnimationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MicroAnimationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

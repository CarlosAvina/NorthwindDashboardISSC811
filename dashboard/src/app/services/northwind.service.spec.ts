import { TestBed } from '@angular/core/testing';

import { NorthwindService } from './northwind.service';

describe('NorthwindService', () => {
  let service: NorthwindService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NorthwindService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

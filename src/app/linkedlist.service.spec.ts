import { TestBed } from '@angular/core/testing';

import { LinkedlistService } from './linkedlist.service';

describe('LinkedlistService', () => {
  let service: LinkedlistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LinkedlistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

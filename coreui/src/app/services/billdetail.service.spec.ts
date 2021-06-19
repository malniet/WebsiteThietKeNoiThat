import { TestBed } from '@angular/core/testing';

import { BilldetailService } from './billdetail.service';

describe('BilldetailService', () => {
  let service: BilldetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BilldetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

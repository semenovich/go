import { TestBed } from '@angular/core/testing';

import { DiplomService } from './diplom.service';

describe('DiplomService', () => {
  let service: DiplomService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiplomService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

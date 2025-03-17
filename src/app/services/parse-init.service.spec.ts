import { TestBed } from '@angular/core/testing';

import { ParseInitService } from './parse-init.service';

describe('ParseInitService', () => {
  let service: ParseInitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParseInitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { UtilisService } from './utilis.service';

describe('UtilisService', () => {
  let service: UtilisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UtilisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

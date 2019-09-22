import { TestBed } from '@angular/core/testing';

import { CensusService } from './census.service';

describe('CensusService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CensusService = TestBed.get(CensusService);
    expect(service).toBeTruthy();
  });
});

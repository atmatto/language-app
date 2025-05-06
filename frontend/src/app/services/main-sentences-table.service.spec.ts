import { TestBed } from '@angular/core/testing';

import { MainSentencesTableService } from './main-sentences-table.service';

describe('MainSentencesTableService', () => {
  let service: MainSentencesTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MainSentencesTableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

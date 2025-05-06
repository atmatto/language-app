import { TestBed } from '@angular/core/testing';

import { MainWordsTableService } from './main-words-table.service';

describe('MainWordsTableService', () => {
  let service: MainWordsTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MainWordsTableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

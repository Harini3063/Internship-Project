import { TestBed } from '@angular/core/testing';

import { TableDataService } from './table-data.service';
import { HttpClientModule } from '@angular/common/http';

describe('TableDataService', () => {
  let service: TableDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientModule]
    });
    service = TestBed.inject(TableDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

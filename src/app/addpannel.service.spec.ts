import { TestBed } from '@angular/core/testing';

import { AddpannelService } from './addpannel.service';

describe('AddpannelService', () => {
  let service: AddpannelService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      
    });
    service = TestBed.inject(AddpannelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

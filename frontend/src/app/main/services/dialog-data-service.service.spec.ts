import { TestBed, inject } from '@angular/core/testing';

import { DialogDataServiceService } from './dialog-data-service.service';

describe('DialogDataServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DialogDataServiceService]
    });
  });

  it('should be created', inject([DialogDataServiceService], (service: DialogDataServiceService) => {
    expect(service).toBeTruthy();
  }));
});

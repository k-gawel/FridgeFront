import { TestBed, inject } from '@angular/core/testing';

import { ItemInstanceApiService } from './item-instance-api.service';

describe('ItemInstanceApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ItemInstanceApiService]
    });
  });

  it('should be created', inject([ItemInstanceApiService], (service: ItemInstanceApiService) => {
    expect(service).toBeTruthy();
  }));
});

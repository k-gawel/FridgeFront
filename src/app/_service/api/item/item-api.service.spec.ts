import {inject, TestBed} from '@angular/core/testing';

import {ItemApiService} from './item-api.service';

describe('ItemApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ItemApiService]
    });
  });

  it('should be created', inject([ItemApiService], (service: ItemApiService) => {
    expect(service).toBeTruthy();
  }));
});

import { TestBed, inject } from '@angular/core/testing';

import { WishListItemApiService } from './wish-list-item-api.service';

describe('WishListItemApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WishListItemApiService]
    });
  });

  it('should be created', inject([WishListItemApiService], (service: WishListItemApiService) => {
    expect(service).toBeTruthy();
  }));
});

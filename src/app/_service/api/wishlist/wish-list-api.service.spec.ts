import {inject, TestBed} from '@angular/core/testing';

import {WishListApiService} from './wish-list-api.service';

describe('WishListApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WishListApiService]
    });
  });

  it('should be created', inject([WishListApiService], (service: WishListApiService) => {
    expect(service).toBeTruthy();
  }));
});

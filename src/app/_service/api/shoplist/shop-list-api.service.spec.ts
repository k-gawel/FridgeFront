import {TestBed} from '@angular/core/testing';

import {ShopListApiService} from './shop-list-api.service';

describe('ShopListApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ShopListApiService = TestBed.get(ShopListApiService);
    expect(service).toBeTruthy();
  });
});

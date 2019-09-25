import {TestBed} from '@angular/core/testing';

import {ShopListServiceService} from './shop-list-service.service';

describe('ShopListServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ShopListServiceService = TestBed.get(ShopListServiceService);
    expect(service).toBeTruthy();
  });
});

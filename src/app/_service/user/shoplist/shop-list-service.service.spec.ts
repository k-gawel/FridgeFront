import {TestBed} from '@angular/core/testing';

import {ShopListService} from './shop-list.service';

describe('ShopListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ShopListService = TestBed.get(ShopListService);
    expect(service).toBeTruthy();
  });
});

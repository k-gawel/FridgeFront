import {inject, TestBed} from '@angular/core/testing';

import {WishListItemService} from './wish-list-item.service';

describe('WishListItemService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WishListItemService]
    });
  });

  it('should be created', inject([WishListItemService], (service: WishListItemService) => {
    expect(service).toBeTruthy();
  }));
});

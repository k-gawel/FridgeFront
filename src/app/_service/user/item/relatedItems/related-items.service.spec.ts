import {inject, TestBed} from '@angular/core/testing';

import {RelatedItemsService} from './related-items.service';

describe('RelatedItemsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RelatedItemsService]
    });
  });

  it('should be created', inject([RelatedItemsService], (service: RelatedItemsService) => {
    expect(service).toBeTruthy();
  }));
});

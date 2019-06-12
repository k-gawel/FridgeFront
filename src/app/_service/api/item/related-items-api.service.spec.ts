import {inject, TestBed} from '@angular/core/testing';

import {RelatedItemsApiService} from './related-items-api.service';

describe('RelatedItemsApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RelatedItemsApiService]
    });
  });

  it('should be created', inject([RelatedItemsApiService], (service: RelatedItemsApiService) => {
    expect(service).toBeTruthy();
  }));
});

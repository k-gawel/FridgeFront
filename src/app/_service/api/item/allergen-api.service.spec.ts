import {inject, TestBed} from '@angular/core/testing';

import {AllergenApiService} from './allergen-api.service';

describe('AllergenApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AllergenApiService]
    });
  });

  it('should be created', inject([AllergenApiService], (service: AllergenApiService) => {
    expect(service).toBeTruthy();
  }));
});

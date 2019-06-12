import {inject, TestBed} from '@angular/core/testing';

import {IngredientApiService} from './ingredient-api.service';

describe('IngredientApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IngredientApiService]
    });
  });

  it('should be created', inject([IngredientApiService], (service: IngredientApiService) => {
    expect(service).toBeTruthy();
  }));
});

import { TestBed, inject } from '@angular/core/testing';

import { AllergenService } from './allergen.service';

describe('AllergenService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AllergenService]
    });
  });

  it('should be created', inject([AllergenService], (service: AllergenService) => {
    expect(service).toBeTruthy();
  }));
});

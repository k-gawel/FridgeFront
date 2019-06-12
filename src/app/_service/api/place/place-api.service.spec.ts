import {inject, TestBed} from '@angular/core/testing';

import {PlaceApiService} from './place-api.service';

describe('PlaceApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlaceApiService]
    });
  });

  it('should be created', inject([PlaceApiService], (service: PlaceApiService) => {
    expect(service).toBeTruthy();
  }));
});

import {inject, TestBed} from '@angular/core/testing';

import {PlaceUserService} from './place-user.service';

describe('PlaceUserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlaceUserService]
    });
  });

  it('should be created', inject([PlaceUserService], (service: PlaceUserService) => {
    expect(service).toBeTruthy();
  }));
});

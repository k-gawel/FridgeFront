import { TestBed, inject } from '@angular/core/testing';

import { ContainerApiService } from './container-api.service';

describe('ContainerApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ContainerApiService]
    });
  });

  it('should be created', inject([ContainerApiService], (service: ContainerApiService) => {
    expect(service).toBeTruthy();
  }));
});

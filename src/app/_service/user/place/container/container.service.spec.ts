import {inject, TestBed} from '@angular/core/testing';

import {ContainerService} from './container.service';

describe('ContainerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ContainerService]
    });
  });

  it('should be created', inject([ContainerService], (service: ContainerService) => {
    expect(service).toBeTruthy();
  }));
});

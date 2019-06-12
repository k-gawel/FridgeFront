import {inject, TestBed} from '@angular/core/testing';

import {ProducerApiService} from './producer-api.service';

describe('ProducerApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProducerApiService]
    });
  });

  it('should be created', inject([ProducerApiService], (service: ProducerApiService) => {
    expect(service).toBeTruthy();
  }));
});

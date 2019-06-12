import {inject, TestBed} from '@angular/core/testing';

import {ProducerService} from './producer.service';

describe('ProducerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProducerService]
    });
  });

  it('should be created', inject([ProducerService], (service: ProducerService) => {
    expect(service).toBeTruthy();
  }));
});

import {inject, TestBed} from '@angular/core/testing';

import {LoggerApiService} from './logger-api.service';

describe('LoggerApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoggerApiService]
    });
  });

  it('should be created', inject([LoggerApiService], (service: LoggerApiService) => {
    expect(service).toBeTruthy();
  }));
});

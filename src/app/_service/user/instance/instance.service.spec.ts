import {inject, TestBed} from '@angular/core/testing';

import {ItemInstanceService} from './item-instance.service';

describe('ItemInstanceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ItemInstanceService]
    });
  });

  it('should be created', inject([ItemInstanceService], (service: ItemInstanceService) => {
    expect(service).toBeTruthy();
  }));
});

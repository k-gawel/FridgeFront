import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ProducersMenuComponent} from './producers-menu.component';

describe('ProducersMenuComponent', () => {
  let component: ProducersMenuComponent;
  let fixture: ComponentFixture<ProducersMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProducersMenuComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProducersMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ItemInstanceComponent} from './item-instance.component';

describe('ItemInstanceComponent', () => {
  let component: ItemInstanceComponent;
  let fixture: ComponentFixture<ItemInstanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ItemInstanceComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemInstanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

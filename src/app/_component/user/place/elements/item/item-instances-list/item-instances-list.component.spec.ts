import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ItemInstancesListComponent} from './item-instances-list.component';

describe('ItemInstancesListComponent', () => {
  let component: ItemInstancesListComponent;
  let fixture: ComponentFixture<ItemInstancesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemInstancesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemInstancesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

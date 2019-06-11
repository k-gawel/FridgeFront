import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemInstancesComponent } from './item-instances.component';

describe('ItemInstancesComponent', () => {
  let component: ItemInstancesComponent;
  let fixture: ComponentFixture<ItemInstancesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemInstancesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemInstancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

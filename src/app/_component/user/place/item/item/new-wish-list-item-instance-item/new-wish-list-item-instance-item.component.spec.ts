import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NewWishListItemInstanceItemComponent} from './new-wish-list-item-instance-item.component';

describe('NewWishListItemInstanceItemComponent', () => {
  let component: NewWishListItemInstanceItemComponent;
  let fixture: ComponentFixture<NewWishListItemInstanceItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NewWishListItemInstanceItemComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewWishListItemInstanceItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

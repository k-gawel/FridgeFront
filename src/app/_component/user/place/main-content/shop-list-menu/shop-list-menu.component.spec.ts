import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ShopListMenuComponent} from './shop-list-menu.component';

describe('ShopListMenuComponent', () => {
  let component: ShopListMenuComponent;
  let fixture: ComponentFixture<ShopListMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ShopListMenuComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopListMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

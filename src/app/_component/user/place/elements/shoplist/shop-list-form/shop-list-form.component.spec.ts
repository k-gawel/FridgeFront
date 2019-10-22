import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ShopListFormComponent} from './shop-list-form.component';

describe('ShopListFormComponent', () => {
  let component: ShopListFormComponent;
  let fixture: ComponentFixture<ShopListFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopListFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopListFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

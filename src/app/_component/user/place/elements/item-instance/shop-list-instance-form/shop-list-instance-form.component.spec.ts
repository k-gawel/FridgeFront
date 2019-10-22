import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ShopListInstanceFormComponent} from './shop-list-instance-form.component';

describe('ShopListInstanceFormComponent', () => {
  let component: ShopListInstanceFormComponent;
  let fixture: ComponentFixture<ShopListInstanceFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopListInstanceFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopListInstanceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

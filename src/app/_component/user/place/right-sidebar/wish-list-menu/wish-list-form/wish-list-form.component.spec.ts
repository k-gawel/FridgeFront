import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WishListFormComponent } from './wish-list-form.component';

describe('WishListFormComponent', () => {
  let component: WishListFormComponent;
  let fixture: ComponentFixture<WishListFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WishListFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WishListFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

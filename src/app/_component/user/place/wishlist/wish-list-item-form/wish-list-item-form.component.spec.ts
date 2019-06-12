import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {WishListItemFormComponent} from './wish-list-item-form.component';

describe('WishListItemFormComponent', () => {
  let component: WishListItemFormComponent;
  let fixture: ComponentFixture<WishListItemFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WishListItemFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WishListItemFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

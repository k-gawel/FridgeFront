import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WishListMenuComponent } from './wish-list-menu.component';

describe('WishListMenuComponent', () => {
  let component: WishListMenuComponent;
  let fixture: ComponentFixture<WishListMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WishListMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WishListMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

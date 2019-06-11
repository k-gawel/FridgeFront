import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatedItemComponent } from './related-item.component';

describe('RelatedItemComponent', () => {
  let component: RelatedItemComponent;
  let fixture: ComponentFixture<RelatedItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelatedItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatedItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

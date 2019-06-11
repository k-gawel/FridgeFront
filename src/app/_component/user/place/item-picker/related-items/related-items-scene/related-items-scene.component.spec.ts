import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatedItemsSceneComponent } from './related-items-scene.component';

describe('RelatedItemsSceneComponent', () => {
  let component: RelatedItemsSceneComponent;
  let fixture: ComponentFixture<RelatedItemsSceneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelatedItemsSceneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatedItemsSceneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

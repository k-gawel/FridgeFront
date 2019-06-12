import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PlaceItemsSceneComponent} from './place-items-scene.component';

describe('PlaceItemsSceneComponent', () => {
  let component: PlaceItemsSceneComponent;
  let fixture: ComponentFixture<PlaceItemsSceneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaceItemsSceneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaceItemsSceneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

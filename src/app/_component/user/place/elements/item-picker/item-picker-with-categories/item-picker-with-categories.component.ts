import {Component, EventEmitter, Input, OnInit, Output, ViewContainerRef} from '@angular/core';
import {Category} from "../../../../../../_models/response/Category";
import {Item} from "../../../../../../_models/response/item/Item";
import {MatBottomSheet} from "@angular/material";
import {Place} from "../../../../../../_models/response/Place";

@Component({
  selector: 'app-item-picker-with-categories',
  styles: [':host { height: 100%; width: 100%; position: absolute; display: flex; flex-direction: column; }',
           'app-item-picker-core { overflow: hidden; }'],
  template: `
    <button mat-button (click)="showCategories = !showCategories">
      {{showCategories ? 'OK' : category.name}}
    </button>
    
    <app-item-input [ngStyle]="{'display': showCategories ? 'none' : '' }" 
                    (value)="input = $event">
    </app-item-input>
    
    <app-item-picker-core [ngStyle]="{'display': showCategories ? 'none' : '' }" 
                          [category]="category" [place]="place" [input]="input"
                          (selectedItem)="selectedItem.emit($event)"></app-item-picker-core>
      
    <categories-menu [ngStyle]="{'display': showCategories ? '' : 'none' }"
                     [rootCategory]="category" (chosenCategory)="setCategory($event)">
    </categories-menu>
  `

})
export class ItemPickerWithCategoriesComponent implements OnInit {

  @Input() category: Category;
  @Input() place:    Place;

  @Output() selectedCategory = new EventEmitter<Category>();
  @Output() selectedItem = new EventEmitter<Item>();

  showCategories: boolean;
  input: string | number = '';

  constructor(private vcRef: ViewContainerRef,
              private bottomSheet: MatBottomSheet) { }

  ngOnInit() {
    this.category = this.category != null ? this.category : Category.rootCategory;
  }

  setCategory(category: Category) {
    this.category = category;
    this.selectedCategory.emit(category);
  }

}

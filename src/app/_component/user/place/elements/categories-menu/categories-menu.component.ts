import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {Category} from '../../../../../_models/response/Category';
import {CategoryService} from '../../../../../_service/user/category/category.service';
import {ErrorHandlerService} from '../../../../../_service/utils/errorhanler/error-handler.service';
import {Size, WindowService} from '../../../../../_service/utils/window.service';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from "@angular/material";

@Component({
    selector: 'categories-menu',
    templateUrl: './categories-menu.component.html',
    styleUrls: ['./categories-menu.component.css']
})
export class CategoriesMenu implements OnInit {

  @Input() rootCategory = Category.rootCategory;
  @Output() chosenCategory = new EventEmitter<Category>();

  constructor() {

  }

  ngOnInit() {
    console.log("Categories", this.rootCategory);
    this.chooseCategory(this.rootCategory);
  }


  chooseCategory(category: Category) {
    if (category == null) return;

    this.rootCategory = category;

    this.chosenCategory.emit(this.rootCategory);
  }

}

@Component({
  template: `
    <categories-menu [rootCategory]="data.category" (chosenCategory)="chosenCategory = $event"></categories-menu>
    <button mat-button (click)="ok()" color="primary">OK</button>
  `
})
export class CategoriesMenuSheet {

  public chosenCategory: Category;

  constructor(private sheetRef: MatBottomSheetRef<CategoriesMenuSheet>,
              @Inject(MAT_BOTTOM_SHEET_DATA) public data: { category: Category }) {
    console.log("CategoriesSheet", this.data);
    this.chosenCategory = this.data.category;
  }

  ok() {
    this.sheetRef.dismiss(this.chosenCategory);
  }

}

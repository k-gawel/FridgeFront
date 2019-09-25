import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Category} from '../../../../_models/response/Category';
import {CategoryService} from '../../../../_service/user/category/category.service';
import {ErrorHandlerService} from '../../../../_service/utils/errorhanler/error-handler.service';
import {ErrorMessage} from '../../../../_models/util/ErrorMessage';
import {Size, WindowService} from '../../../../_service/utils/window.service';

@Component({
    selector: 'categories-menu',
    templateUrl: './categories-menu.component.html',
    styleUrls: ['./categories-menu.component.css']
})
export class CategoriesMenu implements OnInit {

  @Input() rootCategory = Category.rootCategory;
  @Output() chosenCategory = new EventEmitter<Category>();

  isCollapsed: boolean;

  constructor(private categoryService: CategoryService,
              private errorHanddler: ErrorHandlerService,
              windowService: WindowService) {
    windowService.$resize.subscribe(s => this.isCollapsed = s <= Size.SM);
  }

  ngOnInit() {
    this.chooseCategory(this.rootCategory);
  }


  chooseCategory(category: Category) {
    if (category == null) return;

    this.rootCategory = category;

    this.chosenCategory.emit(this.rootCategory);
  }

}

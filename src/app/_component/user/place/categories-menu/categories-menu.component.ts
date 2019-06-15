import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Category} from '../../../../_models/request/Category';
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
      if(this.rootCategory == null)
        this.getRootCategory();
      else
        this.chosenCategory.emit(this.rootCategory);
    }


    chooseCategory(category: Category) {
        if(category == null)
          return;

        if(this.rootCategory.equals(category) && this.rootCategory.parent != null)
          this.rootCategory = this.rootCategory.parent;

        else if(!category.equals(this.rootCategory))
          this.rootCategory = category;

        else if(this.rootCategory.isFinal() && category.equals(this.rootCategory))
          return;

        this.chosenCategory.emit(this.rootCategory);
    }


    getRootCategory() {
      this.categoryService.getRootCategory()
        .then((res: Category) => {
          this.rootCategory = res;
          this.chosenCategory.emit(this.rootCategory);
        })
        .catch((e: ErrorMessage) => {
          this.errorHanddler.sendErrors(e);
        })
    }

}

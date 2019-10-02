import {Component, Inject} from '@angular/core';
import {Item} from '../../../../../../_models/response/item/Item';
import {Category} from '../../../../../../_models/response/Category';
import {ItemService} from '../../../../../../_service/user/item/item/item.service';
import {WishListItemService} from '../../../../../../_service/user/wishlist/wishListItem/wish-list-item.service';
import {WishListItem} from '../../../../../../_models/response/WishListItem';
import {WishList} from '../../../../../../_models/response/WishList';
import {WishListItemForm} from '../../../../../../_models/request/wishlistitem/WishListItemForm';
import {CookieDataService} from '../../../../../../_service/auth/cookieDatas/cookie-datas.service';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

export interface WishListItemFormComponentData {
  wishList: WishList,
}

@Component({
  selector: 'app-wish-list-item-form',
  templateUrl: './wish-list-item-form.component.html',
  styleUrls: ['./wish-list-item-form.component.css']
})
export class WishListItemFormComponent {

  _wishList: WishList;

  activeElement: Item | Category = null;
  chosenCategory: Category = Category.rootCategory;

  form: WishListItemForm = new WishListItemForm();

  constructor(private itemService: ItemService,
              private wishLisstItemService: WishListItemService,
              private cookieDatas: CookieDataService,
              public dialogRef: MatDialogRef<WishListItemFormComponent>,
              @Inject(MAT_DIALOG_DATA) public data: WishListItemFormComponentData) {
    this._wishList = data.wishList;
    this.form.authorId = this.cookieDatas.getUserId();
    this.form.wishListId = this._wishList.id;
  }


  selectCategory(category: Category) {
    this.chosenCategory = category;
    this.form.itemId = null;
    this.form.categoryId = category.id;
    this.activeElement = category;
  }


  selectItem(item: Item) {
    this.chosenCategory = item.category;
    this.form.itemId = item.id;
    this.form.categoryId = null;
    this.activeElement = item;
  }


  submit() {
    this.wishLisstItemService.newItem(this.form)
      .then( (res: WishListItem) => {
        if (res == null)
          return;
        else
          this.dialogRef.close(res);
      });
  }


}

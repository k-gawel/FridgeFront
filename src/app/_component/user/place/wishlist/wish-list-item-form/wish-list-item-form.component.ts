import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Item} from '../../../../../_models/request/item/Item';
import { Category } from '../../../../../_models/request/Category';
import { ItemService } from '../../../../../_service/user/item/item/item.service';
import { WishListItemService } from '../../../../../_service/user/place/wishlist/wishListItem/wish-list-item.service';
import { WishListItem } from '../../../../../_models/request/WishListItem';
import { WishList } from '../../../../../_models/request/WishList';
import {WishListItemForm} from "../../../../../_models/response/WishListItemForm";
import {PlaceDetails} from "../../../../../_models/request/PlaceDetails";
import {CookieDataService} from "../../../../../_service/auth/cookieDatas/cookie-datas.service";

@Component({
  selector: 'app-wish-list-item-form',
  templateUrl: './wish-list-item-form.component.html',
  styleUrls: ['./wish-list-item-form.component.css']
})
export class WishListItemFormComponent implements OnInit {

  _wishList: WishList;
  _place: PlaceDetails = new PlaceDetails();

  @Input()
  set wishList(wishList: WishList) {
    console.log("WishListItemFormComponent.setWishList()", wishList);
    this.form.wishList = wishList.id;
    this._place.id = wishList.placeId;
    this._wishList = wishList;
  }

  @Output() newItem = new EventEmitter<WishListItem>();

  activeElement: Item | Category = null;
  chosenCategory: Category = Category.rootCategory;


  form: WishListItemForm = new WishListItemForm();

  constructor(private itemService: ItemService,
              private wishLisstItemService: WishListItemService,
              private cookieDatas: CookieDataService) { }

  ngOnInit() {
    this.form.author = this.cookieDatas.getUserId();
  }


  selectCategory(category: Category) {
    console.debug("WishListItemFormComponent.selectCategory()", category);
    this.chosenCategory = category;
    this.form.item = 0;
    this.form.category = category.id;
    this.activeElement = category;
  }


  selectItem(item: Item) {
    console.debug("WishListItemFormComponent.selectItem()", item);
    this.form.item = item.id;
    this.form.category = item.category.id;
    this.activeElement = item;
  }


  submit() {
    console.debug("WishListItemFormComponent.submit()");

    this.wishLisstItemService.newItem(this.form)
      .then( (res: WishListItem) => {
        if(res == null) {
          console.debug("WishListItemFormComponent.submit() res is null");
          return;
        }
        else {
          console.debug("WishListItemFormComponent.submit() res is'nt null", res);
          this.newItem.emit(res);
        }
      }).catch((e: Error) => {
        console.debug("WishListItemFormComponent.submit() error", e);
    })
  }


}

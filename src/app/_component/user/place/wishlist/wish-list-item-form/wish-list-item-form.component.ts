import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Item} from '../../../../../_models/response/item/Item';
import {Category} from '../../../../../_models/response/Category';
import {ItemService} from '../../../../../_service/user/item/item/item.service';
import {WishListItemService} from '../../../../../_service/user/place/wishlist/wishListItem/wish-list-item.service';
import {WishListItem} from '../../../../../_models/response/WishListItem';
import {WishList} from '../../../../../_models/response/WishList';
import {WishListItemForm} from '../../../../../_models/request/WishListItemForm';
import {PlaceDetails} from '../../../../../_models/response/PlaceDetails';
import {CookieDataService} from '../../../../../_service/auth/cookieDatas/cookie-datas.service';

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
    this.form.wish_list_id = wishList.id;
    this._place.id = wishList.placeId;
    this._wishList = wishList;
  }

  @Output() newItem = new EventEmitter<WishListItem>();
  @Output() close = new EventEmitter<void>();

  activeElement: Item | Category = null;
  chosenCategory: Category = Category.rootCategory;

  form: WishListItemForm = new WishListItemForm();

  constructor(private itemService: ItemService,
              private wishLisstItemService: WishListItemService,
              private cookieDatas: CookieDataService) { }

  ngOnInit() {
    this.form.author_id = this.cookieDatas.getUserId();
  }

  selectCategory(category: Category) {
    this.chosenCategory = category;
    this.form.item_id = null;
    this.form.category_id = category.id;
    this.activeElement = category;
  }

  selectItem(item: Item) {
    this.chosenCategory = item.category;
    this.form.item_id = item.id;
    this.form.category_id = null;
    this.activeElement = item;
  }

  submit() {
    this.wishLisstItemService.newItem(this.form)
      .then( (res: WishListItem) => {
        if(res == null) {
          return;
          console.log("WISHLISTITEMFORMRESULT IS NULL");
        }
        else
          this.newItem.emit(res);
      });
  }

}

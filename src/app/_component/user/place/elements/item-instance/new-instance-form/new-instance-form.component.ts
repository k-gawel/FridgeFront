import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ItemInstanceForm} from '../../../../../../_models/request/iteminstance/ItemInstanceForm';
import {Item} from '../../../../../../_models/response/item/Item';
import {ItemInstance} from '../../../../../../_models/response/item/ItemInstance';
import {AccountService} from '../../../../../../_service/user/user/account.service';
import {PlaceService} from '../../../../../../_service/user/place/place/place.service';
import {ItemInstanceService} from '../../../../../../_service/user/instance/item-instance.service';
import {PlaceDetailsList} from "../../../../../../_models/response/PlaceDetails";
import {WishListItem, WishListItemList} from "../../../../../../_models/response/WishListItem";
import {WishList, WishListList} from "../../../../../../_models/response/WishList";
import {Currencies, Currency} from "ts-money";
import {CookieDataService} from "../../../../../../_service/auth/cookieDatas/cookie-datas.service";
import {ShopList, ShopListList} from "../../../../../../_models/response/ShopList";


@Component({
  selector: 'app-new-instance-form',
  templateUrl: './new-instance-form.component.html',
  styleUrls: ['./new-instance-form.component.css']
})
export class NewInstanceFormComponent implements OnInit {

  currencies: Currency[] = Object.values(Currencies);

  console = console;

  @Input() item: Item;
  @Input() places: PlaceDetailsList;

  @Input() wishListItem: WishListItem;
  @Input() shopList: ShopList;

  @Output() newInstance = new EventEmitter<ItemInstance>();

  form: ItemInstanceForm = new ItemInstanceForm();


  constructor(private cookieService: CookieDataService,
              private userService: AccountService,
              private placeService: PlaceService,
              private instanceService: ItemInstanceService) {
  }


  ngOnInit() {
    this.form.item = this.item.id;
    this.form.price.currency = Currencies.PLN.code;
    this.form.user = this.cookieService.getUserId();

    if (this.wishListItem != null)
      this.form.wishListItem = this.wishListItem.id;
    if (this.shopList != null)
      this.form.shopList = this.shopList.id;
  }


  getShopLists(): ShopListList {
    let result = new ShopListList();

    if(this.shopList != null) {
      result.add(this.shopList);
    } else {
      this.places.map(p => p.shopLists).forEach(sl => result.addAll(sl));
      result = <ShopListList> result.filter(sl => sl.status);
    }

    return result;
  }


  getWishLists(): WishListList {
    let result = new WishListList();

    if (this.wishListItem != null) {
      result.add(this.wishListItem.wishList);
    }
    else {
      this.places.map(p => p.wishLists).forEach(w => result.addAll(w));
      result = <WishListList> result.filter(w => w.wishListItems.filterByItem(this.item).size() != 0);
    }

    return result;
  }


  getItems(wishList: WishList): WishListItemList {
    return this.wishListItem != null ?
      <WishListItemList> new WishListItemList().add(this.wishListItem)
      : wishList.wishListItems.filterByItem(this.item);
  }


  submit() {
    let processValidate = (r: boolean) => {
      if(r) processSubmit();
    };

    let processSubmit = () => {
      this.instanceService.addInstance(this.form)
        .then(processSubmitResult)
    };

    let processSubmitResult = (res: ItemInstance) => {
      if(res != null) this.newInstance.emit(res);
    };

    this.form.validate().then(processValidate);
  }


}

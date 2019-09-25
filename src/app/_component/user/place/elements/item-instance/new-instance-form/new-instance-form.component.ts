import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ItemInstanceForm} from '../../../../../../_models/request/ItemInstanceForm';
import {Item} from '../../../../../../_models/response/item/Item';
import {ItemInstance} from '../../../../../../_models/response/item/ItemInstance';
import {AccountService} from '../../../../../../_service/user/user/account.service';
import {PlaceService} from '../../../../../../_service/user/place/place/place.service';
import {ItemInstanceService} from '../../../../../../_service/user/instance/item-instance.service';
import {ErrorMessage} from '../../../../../../_models/util/ErrorMessage';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {PlaceDetailsList} from "../../../../../../_models/response/PlaceDetails";
import {WishListItem, WishListItemList} from "../../../../../../_models/response/WishListItem";
import {WishList, WishListList} from "../../../../../../_models/response/WishList";
import {Currencies, Currency, Money} from "ts-money";
import {CookieDataService} from "../../../../../../_service/auth/cookieDatas/cookie-datas.service";


@Component({
  selector: 'app-new-instance-form',
  templateUrl: './new-instance-form.component.html',
  styleUrls: ['./new-instance-form.component.css']
})
export class NewInstanceFormComponent implements OnInit {

  currencies: Currency[] = Object.values(Currencies);


  @Input() item: Item;
  @Input() places: PlaceDetailsList;

  @Input() wishListItem: WishListItem;
  @Input() shopListItem: any;

  @Output() newInstance = new EventEmitter<ItemInstance>();

  form: ItemInstanceForm = new ItemInstanceForm();


  constructor(private cookieService: CookieDataService,
              private userService: AccountService,
              private placeService: PlaceService,
              private instanceService: ItemInstanceService) {
  }


  ngOnInit() {
    this.form.itemId = this.item.id;
    this.form.price.currency = Currencies.PLN.code;
    this.form.userId = this.cookieService.getUserId();

    if (this.wishListItem != null)
      this.form.wishListItemId = this.wishListItem.id;
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
    if (!this.form.validate()) return;

    this.instanceService.addInstance(this.form)
      .then((res: ItemInstance) => {
        if (res == null)
          throw new ErrorMessage("instancecreate.unable");
        else
          this.newInstance.emit(res);
      })
      .catch((error: ErrorMessage) => this.form.errors = error);
  }


}

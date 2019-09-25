import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Item} from "../../../../../../_models/response/item/Item";
import {WishListItem} from "../../../../../../_models/response/WishListItem";
import {PlaceDetails, PlaceDetailsList} from "../../../../../../_models/response/PlaceDetails";
import {ItemInstance} from "../../../../../../_models/response/item/ItemInstance";
import {WishListItemService} from "../../../../../../_service/user/place/wishlist/wishListItem/wish-list-item.service";

@Component({
  selector: 'app-new-wish-list-item-instance-item',
  templateUrl: './new-wish-list-item-instance-item.component.html',
  styleUrls: ['./new-wish-list-item-instance-item.component.css']
})
export class NewWishListItemInstanceItemComponent implements OnInit {

  @Input() item: Item;
  @Input() wishListItem: WishListItem;

  @Output() ready = new EventEmitter();

  places: PlaceDetails[];

  newInstanceForm: boolean = false;

  constructor(private wishListItemService: WishListItemService) {
  }


  ngOnInit() {
    this.places = [this.wishListItem.wishList.place];
  }


  async addInstance(instance: ItemInstance) {
    await this.wishListItemService.addInstance(this.wishListItem, instance);
    this.ready.emit();
  }


}

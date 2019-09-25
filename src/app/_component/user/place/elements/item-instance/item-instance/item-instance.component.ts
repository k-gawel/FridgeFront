import {Component, Input, OnInit} from '@angular/core';
import {ItemInstance} from "../../../../../../_models/response/item/ItemInstance";
import {WishListItem, WishListItemList} from "../../../../../../_models/response/WishListItem";
import {ItemInstanceService} from "../../../../../../_service/user/instance/item-instance.service";
import {WishListItemService} from "../../../../../../_service/user/wishlist/wishListItem/wish-list-item.service";
import {WishList, WishListList} from "../../../../../../_models/response/WishList";
import {ItemsList} from "../../../../../../_models/response/item/ItemsList";
import {EntityList} from "../../../../../../_models/response/Entity";
import {DialogService} from "../../../../../../_service/utils/dialog.service";
import {MatDialog} from "@angular/material";
import {WishListItemComponentData} from "../../wishlist/wish-list-item/wish-list-item.component";
import {WishListComponentData} from "../../wishlist/wish-list/wish-list.component";

@Component({
  selector: 'app-item-instance',
  templateUrl: './item-instance.component.html',
  styleUrls: ['./item-instance.component.css']
})
export class ItemInstanceComponent implements OnInit {

  @Input() instance: ItemInstance;
  @Input() buttonColor: string;

  wishListItem: WishListItem;
  shopListItem: any;


  constructor(private itemInstanceService: ItemInstanceService,
              private wishListItemService: WishListItemService,
              private dialog: MatDialog) {
  }

  ngOnInit() {
  }


  deleteInstance() {
    this.itemInstanceService.deleteInstance(this.instance);
  }


  openInstance() {
    this.itemInstanceService.openInstance(this.instance);
  }


  addToWishListItem(wlItem: WishListItem) {
    this.wishListItemService.addInstance(wlItem, this.instance);
  }


  getWishLists(): EntityList<WishList> {
    let item = ItemsList.ALL[this.instance.itemId];
    let place = this.instance.container.place;
    return place.wishLists.filter(w => w.wishListItems.filterByItem(item).size() != 0);
  }


  getWishListItems(wishList: WishList): EntityList<WishListItem> {
    let item = ItemsList.ALL[this.instance.itemId];
    return wishList.wishListItems.filterByItem(item).filter(i => i.addedInstance == null);
  }


  openWishList() {
    const wlData: WishListComponentData = {wishList: this.instance.wishListItem.wishList};
    const wlItemdata: WishListItemComponentData = {item: this.instance.wishListItem};

    const wlDialogRef = DialogService.createWishListComponent(this.dialog, wlData);
    const wliDialogRef = DialogService.createWishListItemComponent(this.dialog, wlItemdata);
  }


}

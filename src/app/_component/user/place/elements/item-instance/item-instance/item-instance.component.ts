import {Component, Input, OnInit} from '@angular/core';
import {ItemInstance} from "../../../../../../_models/response/item/ItemInstance";
import {WishListItem} from "../../../../../../_models/response/WishListItem";
import {ItemInstanceService} from "../../../../../../_service/user/instance/item-instance.service";
import {WishListItemService} from "../../../../../../_service/user/wishlist/wishListItem/wish-list-item.service";
import {WishList} from "../../../../../../_models/response/WishList";
import {ItemsList} from "../../../../../../_models/response/item/ItemsList";
import {EntityList} from "../../../../../../_models/response/Entity";
import {DialogService} from "../../../../../../_service/utils/dialog.service";
import {MatDialog} from "@angular/material";
import {WishListItemComponentData} from "../../wishlist/wish-list-item/wish-list-item.component";
import {WishListComponentData} from "../../wishlist/wish-list/wish-list.component";
import {ShopList} from "../../../../../../_models/response/ShopList";
import {ShopListService} from "../../../../../../_service/user/shoplist/shop-list.service";
import {ShopListData} from "../../shoplist/shop-list/shop-list.component";

@Component({
  selector: 'app-item-instance',
  templateUrl: './item-instance.component.html',
  styleUrls: ['./item-instance.component.css']
})
export class ItemInstanceComponent implements OnInit {

  @Input() instance: ItemInstance;
  @Input() buttonColor: string;


  constructor(private itemInstanceService: ItemInstanceService,
              private wishListItemService: WishListItemService,
              private dialog: MatDialog,
              private shopListService: ShopListService) {
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

  addToShopList(sl: ShopList) {
    this.shopListService.addInstance(sl, this.instance);
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

  getShopLists(): EntityList<ShopList> {
    let place = this.instance.container.place;
    return place.shopLists.filter(sl => sl.status);
  }


  openWishList() {
    const wlData: WishListComponentData = {wishList: this.instance.wishListItem.wishList};
    const wlItemdata: WishListItemComponentData = {item: this.instance.wishListItem};

    const wlDialogRef = DialogService.createWishListComponent(this.dialog, wlData);
    const wliDialogRef = DialogService.createWishListItemComponent(this.dialog, wlItemdata);
  }

  openShopList() {
    const data: ShopListData = { shopList: this.instance.shopList };

    const dialogRef = DialogService.createShopList(this.dialog, data);
  }

}

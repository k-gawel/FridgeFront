import {Injectable} from '@angular/core';
import {MatDialog, MatDialogConfig, MatDialogRef} from "@angular/material";
import {
  NewItemComponent,
  NewItemDatas
} from "../../_component/user/place/elements/item/new-item-form/new_item.component";
import {ItemComponent, ItemComponentData} from "../../_component/user/place/elements/item/item/item.component";
import {
  WishListFormComponent,
  WishListFormDatas
} from "../../_component/user/place/elements/wishlist/wish-list-form/wish-list-form.component";
import {
  WishListComponent,
  WishListComponentData
} from "../../_component/user/place/elements/wishlist/wish-list/wish-list.component";
import {
  WishListItemFormComponent,
  WishListItemFormComponentData
} from "../../_component/user/place/elements/wishlist/wish-list-item-form/wish-list-item-form.component";
import {
  WishListItemComponent,
  WishListItemComponentData
} from "../../_component/user/place/elements/wishlist/wish-list-item/wish-list-item.component";
import {ScrollStrategy} from "@angular/cdk/overlay";
import {WishListItem} from "../../_models/response/WishListItem";
import {WishList} from "../../_models/response/WishList";
import {Item} from "../../_models/response/item/Item";
import {
  ShopListFormDialog,
  ShopListFormDialogData
} from "../../_component/user/place/elements/shoplist/shop-list-form/shop-list-form.component";
import {ShopList} from "../../_models/response/ShopList";

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor() {
  }

  private static addFullWidth(config: MatDialogConfig): MatDialogConfig {
    config.width = "100%";
    config.maxWidth = "100vw";
    return config;
  }

  private static addFullHeight(config: MatDialogConfig): MatDialogConfig {
    config.height = "100%";
    config.maxHeight = "100vh";

    return config;
  }

  private static addNoPadding(config: MatDialogConfig): MatDialogConfig {
    config.panelClass = 'app-full-bleed-dialog';
    return config;
  }

  private static getFullScreenConfig(data: any): MatDialogConfig {
    let config = new MatDialogConfig();
    config.data = data;
    config = this.addFullHeight(config);
    config = this.addFullWidth(config);

    return config;
  }

  private static getFullScreenNoPaddingConfig(data: any): MatDialogConfig {
    let config = this.getFullScreenConfig(data);
    config.panelClass = 'app-full-bleed-dialog';
    return config;
  }

  private static getFullWidthConfig(data: any) {
    return {
      width: "100%",
      maxWidth: "100vw",
      data: data
    }
  }


  private static createFullWidthComponent(dialog, component, data) {
    const config = this.getFullWidthConfig(data);
    return dialog.open(component, config);
  }


  private static createFullScreenComponent(dialog: MatDialog, component, datas) {
    const config = this.getFullScreenConfig(datas);
    return dialog.open(component, config);
  }


  public static createItemFormComponent(dialog: MatDialog, datas: NewItemDatas): MatDialogRef<NewItemComponent, Item | undefined> {
    return <MatDialogRef<NewItemComponent, Item | undefined>> this.createFullScreenComponent(dialog, NewItemComponent, datas);
  }


  public static createItemComponent(dialog: MatDialog, datas: ItemComponentData): MatDialogRef<ItemComponent, undefined> {
    return <MatDialogRef<ItemComponent, undefined>> this.createFullScreenComponent(dialog, ItemComponent, datas);
  }


  public static createWishListForm(dialog: MatDialog, datas: WishListFormDatas): MatDialogRef<WishListFormComponent, WishList> {
    const config = this.getFullWidthConfig(datas);
    return <MatDialogRef<WishListFormComponent, WishList>> dialog.open(WishListFormComponent, config);
  }


  public static createWishListComponent(dialog: MatDialog, datas: WishListComponentData): MatDialogRef<WishListComponent, undefined> {
    return <MatDialogRef<WishListComponent, undefined>> this.createFullScreenComponent(dialog, WishListComponent, datas);
  }


  public static createWishListItemComponent(dialog: MatDialog, data: WishListItemComponentData): MatDialogRef<WishListItemComponent, undefined> {
    let config = new MatDialogConfig();
    config.data = data;
    config = this.addFullWidth(config);
    return <MatDialogRef<WishListItemComponent, undefined>> dialog.open(WishListItemComponent, config);
  }


  public static createWishListItemFromComponent(dialog: MatDialog, data: WishListItemFormComponentData): MatDialogRef<WishListItemFormComponent, WishListItem | undefined> {
    return <MatDialogRef<WishListItemFormComponent, WishListItem | undefined>> this.createFullWidthComponent(dialog, WishListItemFormComponent, data);
  }

  public static createShopListForm(dialog: MatDialog, data: ShopListFormDialogData): MatDialogRef<ShopListFormDialog, ShopList | void> {
    return this.createFullWidthComponent(dialog, ShopListFormDialog, data);
  }

}

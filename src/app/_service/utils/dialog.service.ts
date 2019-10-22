import {Injectable, TemplateRef} from '@angular/core';
import {MatDialog, MatDialogConfig, MatDialogRef} from "@angular/material";
import {
  NewItemComponent,
  NewItemDatas
} from "../../_component/user/place/elements/item/new-item-form/new_item.component";
import {ItemComponent, ItemComponentData} from "../../_component/user/place/elements/item/item/item.component";
import {
  WishListFormData,
  WishListFormDialog
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
import {WishListItem} from "../../_models/response/WishListItem";
import {WishList} from "../../_models/response/WishList";
import {Item} from "../../_models/response/item/Item";
import {
  ShopListFormDialog,
  ShopListFormDialogData
} from "../../_component/user/place/elements/shoplist/shop-list-form/shop-list-form.component";
import {ShopList} from "../../_models/response/ShopList";
import {
  ShopListComponent,
  ShopListData
} from "../../_component/user/place/elements/shoplist/shop-list/shop-list.component";
import {
  NewShopListInstanceComponent,
  NewShopListInstanceData,
  NewShopListInstanceDialog
} from "../../_component/user/place/elements/shoplist/new-shop-list-instance/new-shop-list-instance.component";
import {ItemInstance} from "../../_models/response/item/ItemInstance";
import {ComponentType} from "@angular/cdk/typings/portal";

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  private static readonly fullScreen = "dialog-full-screen";
  private static readonly noPadding = "dialog-no-padding";
  private static readonly fullWidth = "dialog-full-width";

  constructor() {
  }

  // UTILS

  private static getConfig(panelClasses: string[] | string, data: any): MatDialogConfig {
    const config = new MatDialogConfig();
    config.data = data;
    config.panelClass = panelClasses;
    return config;
  }

  private static getFullScreenNoPaddingConfig(data: any): MatDialogConfig {
    return this.getConfig([this.fullScreen, this.noPadding], data);
  }

  private static getFullScreenConfig(data: any): MatDialogConfig {
    return this.getConfig([this.fullScreen], data);
  }

  private static getFullWidthConfig(data: any): MatDialogConfig {
    return this.getConfig([this.fullWidth], data);
  }

  private static createFullWidthComponent<T>(dialog, component: ComponentType<T> | TemplateRef<T>, data): MatDialogRef<T> {
    return dialog.open(component, this.getFullWidthConfig(data));
  }

  private static createFullScreenComponent<T>(dialog: MatDialog, component: ComponentType<T> | TemplateRef<T>, datas): MatDialogRef<T> {
    return dialog.open(component, this.getFullScreenConfig(datas));
  }

  private static createFullScreenNoPaddingComponent<T>(dialog: MatDialog, component: ComponentType<T> | TemplateRef<T>, data): MatDialogRef<T> {
    return dialog.open(component, this.getFullScreenNoPaddingConfig(data));
  }

  // ITEM

  public static createItemFormComponent(dialog: MatDialog, datas: NewItemDatas): MatDialogRef<NewItemComponent, Item | undefined> {
    return <MatDialogRef<NewItemComponent, Item | undefined>> this.createFullScreenComponent(dialog, NewItemComponent, datas);
  }

  public static createItemComponent(dialog: MatDialog, datas: ItemComponentData): MatDialogRef<ItemComponent, undefined> {
    return this.createFullScreenNoPaddingComponent(dialog, ItemComponent, datas);
  }


  // WISH LIST

  public static createWishListForm(dialog: MatDialog, datas: WishListFormData): MatDialogRef<WishListFormDialog, WishList> {
    const config = this.getFullWidthConfig(datas);
    return dialog.open(WishListFormDialog, config);
  }

  public static createWishListComponent(dialog: MatDialog, datas: WishListComponentData): MatDialogRef<WishListComponent, undefined> {
    return this.createFullScreenNoPaddingComponent(dialog, WishListComponent, datas);
  }


  // WISH LIST ITEM

  public static createWishListItemComponent(dialog: MatDialog, data: WishListItemComponentData): MatDialogRef<WishListItemComponent, undefined> {
    let config = this.getFullWidthConfig(data);
    return <MatDialogRef<WishListItemComponent, undefined>> dialog.open(WishListItemComponent, config);
  }

  public static createWishListItemFromComponent(dialog: MatDialog, data: WishListItemFormComponentData): MatDialogRef<WishListItemFormComponent, WishListItem | undefined> {
    return <MatDialogRef<WishListItemFormComponent, WishListItem | undefined>> this.createFullWidthComponent(dialog, WishListItemFormComponent, data);
  }


  // SHOP LIST

  public static createShopListForm(dialog: MatDialog, data: ShopListFormDialogData): MatDialogRef<ShopListFormDialog, ShopList | void> {
    return this.createFullWidthComponent(dialog, ShopListFormDialog, data);
  }

  public static createShopList(dialog: MatDialog, data: ShopListData): MatDialogRef<ShopListComponent> {
    return this.createFullScreenNoPaddingComponent(dialog, ShopListComponent, data);
  }

  public static createShopListInstanceForm(dialog: MatDialog, data: NewShopListInstanceData): MatDialogRef<NewShopListInstanceDialog, ItemInstance> {
    const config = this.getConfig([this.fullWidth, this.noPadding], data);
    return dialog.open(NewShopListInstanceDialog, config);
  }

}

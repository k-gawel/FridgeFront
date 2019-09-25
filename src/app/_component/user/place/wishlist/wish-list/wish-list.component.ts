import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {WishList} from '../../../../../_models/response/WishList';
import {WishListItem} from '../../../../../_models/response/WishListItem';
import {WishListService} from '../../../../../_service/user/place/wishlist/wishlist/wish-list.service';
import {WishListItemFormComponent} from '../wish-list-item-form/wish-list-item-form.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Item} from '../../../../../_models/response/item/Item';
import {ItemInstanceService} from '../../../../../_service/user/instance/item-instance.service';
import {ContainersList} from '../../../../../_models/response/Container';
import {IdSelector} from '../../../../../_service/utils/EntitySelector';
import {WishListItemService} from '../../../../../_service/user/place/wishlist/wishListItem/wish-list-item.service';
import {ItemInstancesList} from '../../../../../_models/response/item/ItemInstancesList';
import {PlaceDetails} from '../../../../../_models/response/PlaceDetails';
import {ErrorHandlerService} from '../../../../../_service/utils/errorhanler/error-handler.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material";
import {DialogService} from "../../../../../_service/utils/dialog.service";
import {EntityList} from "../../../../../_models/response/Entity";


export interface WishListComponentData {
  wishList: WishList,

}


@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.css']
})
export class WishListComponent {

  _wishList: WishList;
  items: EntityList<WishListItem> = new EntityList<WishListItem>();

  containers: ContainersList;
  itemsInstances: ItemInstancesList = new ItemInstancesList();

  constructor(private wishListService: WishListService,
              private wishListItemService: WishListItemService,
              private modalService: NgbModal,
              private instanceService: ItemInstanceService,
              private errorHandler: ErrorHandlerService,
              private dialog: MatDialog,
              public dialogRef: MatDialogRef<WishListComponent>,
              @Inject(MAT_DIALOG_DATA) public data: WishListComponentData) {
    this._wishList = this.data.wishList;
  }


  newWishListItem(item: WishListItem) {
    this.wishListItemService.get(item)
      .then((res: WishListItem) => {
        this._wishList.pushNewItem(res);
      })
      .catch((e: Error) => {
        this.errorHandler.sendErrors(e);
      })
  }


  archive() {
    this.wishListService.archive(this._wishList);
    this.dialogRef.close();
  }


  addInstance(item: WishListItem) {

  }


  openItem(item: WishListItem) {
    const data = {
      item: item
    };

    const dialogRef = DialogService.createWishListItemComponent(this.dialog, data);
  }


  openForm() {
    const data = {
      wishList: this._wishList
    };

    const dialogRef = DialogService.createWishListItemFromComponent(this.dialog, data);
    dialogRef.afterClosed().subscribe((res: WishListItem) => {
      if (res != null)
        this.newWishListItem(res);
    });
  }


}

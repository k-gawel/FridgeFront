import {Component, Inject} from '@angular/core';
import {WishListItem} from '../../../../../../_models/response/WishListItem';
import {WishListService} from '../../../../../../_service/user/wishlist/wishlist/wish-list.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ItemInstanceService} from '../../../../../../_service/user/instance/item-instance.service';
import {ContainersList} from '../../../../../../_models/response/Container';
import {WishListItemService} from '../../../../../../_service/user/wishlist/wishListItem/wish-list-item.service';
import {ErrorHandlerService} from '../../../../../../_service/utils/errorhanler/error-handler.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material";
import {DialogService} from "../../../../../../_service/utils/dialog.service";
import {EntityList} from "../../../../../../_models/response/Entity";
import {WishList} from "../../../../../../_models/response/WishList";


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


  addInstance(item: WishListItem) {

  }


  openForm() {
    const dialogRef = DialogService.createWishListItemFromComponent(this.dialog, { wishList: this._wishList });
  }


  indicatorClass(item: WishListItem): string {
    if(item.added != null)
      return 'header-added';
    else if(this._wishList.archived != null && item.added == null)
      return 'header-missed';
    else
      return null;
  }


}

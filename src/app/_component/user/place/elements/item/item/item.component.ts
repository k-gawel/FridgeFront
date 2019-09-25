import {Component, Inject, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef} from "@angular/material";
import {Item} from "../../../../../../_models/response/item/Item";
import {PlaceDetails, PlaceDetailsList} from "../../../../../../_models/response/PlaceDetails";
import {WishList, WishListList} from "../../../../../../_models/response/WishList";
import {ItemInstance} from "../../../../../../_models/response/item/ItemInstance";
import {WishListItem, WishListItemList} from "../../../../../../_models/response/WishListItem";
import {ItemInstanceQuery, ItemInstanceService} from "../../../../../../_service/user/instance/item-instance.service";
import {WishListItemService} from "../../../../../../_service/user/wishlist/wishListItem/wish-list-item.service";
import {EntityList} from "../../../../../../_models/response/Entity";
import {Container} from "../../../../../../_models/response/Container";
import {ItemInstancesList} from "../../../../../../_models/response/item/ItemInstancesList";

export interface ItemComponentData {
  item: Item;
  places: PlaceDetails[]
}

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent {

  content: string = 'INSTANCES';
  item: Item;
  places: PlaceDetailsList = new PlaceDetailsList();
  wishListItem: any;


  constructor(private itemInstanceService: ItemInstanceService,
              private wishListItemService: WishListItemService,
              public dialogRef: MatDialogRef<ItemComponent>,
              private dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: ItemComponentData) {
    this.item = data.item;
    this.places.addAll(data.places);
  }


  deletedInstances: ItemInstancesList[] = [];
  private deletedInstancesFetches: number = 0;

  getDeletedInstances() {
    let query = new ItemInstanceQuery();
    query.containers = this.places.getContainers().map(c => c.id);
    query.items = this.item.id;
    query.deleted = true;
    query.limit = 20;
    query.offset = this.deletedInstancesFetches * 20;
    this.itemInstanceService.get(query).then(ii => {
      this.deletedInstances.push(ii);
      this.deletedInstancesFetches = ii.size() != 0 ? this.deletedInstancesFetches + 1 : null;
    });
  }


  addNewInstance() {
    const formDatas = {
      item: this.item,
      places: this.places
    };

    const dialogRef = this.dialog.open(NewInstanceFormDialog, {
      maxWidth: "100vw",
      width: "100%",
      data: formDatas
    });
  }


  getContainers(itemInstances?: ItemInstancesList): EntityList<Container> {
    return this.places.getContainers()
      .filter(c => c.instances.filterByDeleted(false).size() != 0);
  }

}

@Component({
  template: `
    <mat-toolbar class="dialog-full-screen-toolbar">
      <mat-toolbar-row>
        <span>Add instance</span>

        <close-dialog-button [dialogRef]="dialogRef"></close-dialog-button>
      </mat-toolbar-row>
    </mat-toolbar>

    <app-new-instance-form [item]="data.item" [places]="data.places" (newInstance)="instanceAdded($event)">
    </app-new-instance-form>
  `
})
export class NewInstanceFormDialog {

  constructor(public dialogRef: MatDialogRef<NewInstanceFormDialog>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  instanceAdded(instance: ItemInstance) {
    this.dialogRef.close();
  }

}

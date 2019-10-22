import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material";
import {Item} from "../../../../../../_models/response/item/Item";
import {Place, PlacesList} from "../../../../../../_models/response/Place";
import {ItemInstance} from "../../../../../../_models/response/item/ItemInstance";
import {ItemInstanceService} from "../../../../../../_service/user/instance/item-instance.service";
import {WishListItemService} from "../../../../../../_service/user/wishlist/wishListItem/wish-list-item.service";
import {ApiService} from "../../../../../../_service/api/api/api.service";

export interface ItemComponentData {
  item: Item;
  places: Place[]
}

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent {

  content: string = 'INSTANCES';
  item: Item;
  places: PlacesList = new PlacesList();
  wishListItem: any;


  constructor(private itemInstanceService: ItemInstanceService,
              private wishListItemService: WishListItemService,
              public dialogRef: MatDialogRef<ItemComponent>,
              private dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: ItemComponentData) {
    this.item = data.item;
    this.places.addAll(data.places);
  }

  get imageUrl(): string {
    return ApiService.imageUrl(this.item);
  }

  addNewInstance() {
    const data = { item: this.item, places: this.places };
    const config = { data: data, panelClass: 'full-width'};
    const dialogRef = this.dialog.open(NewInstanceFormDialog, config);
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

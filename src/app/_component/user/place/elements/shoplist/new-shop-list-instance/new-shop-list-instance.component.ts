import {Component, Inject} from '@angular/core';
import {ShopList} from "../../../../../../_models/response/ShopList";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

export interface NewShopListInstanceData {
  shopList: ShopList;
}

@Component({
  template: `
    <mat-toolbar class="space-between">
      <span>Add</span>
      <close-dialog-button [dialogRef]="dialogRef"></close-dialog-button>
    </mat-toolbar>
    
    <app-item-instance-for-list-form class="dialog-content" [shopList]="data.shopList">
    </app-item-instance-for-list-form>
  `
})
export class NewShopListInstanceDialog {

  constructor(public dialogRef: MatDialogRef<NewShopListInstanceDialog>,
              @Inject(MAT_DIALOG_DATA) public data: NewShopListInstanceData) {
  }


}

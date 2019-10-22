import {Component, Inject, Input} from '@angular/core';
import {WishListItem} from '../../../../../../_models/response/WishListItem';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

export interface WishListItemComponentData {
  item: WishListItem
}

@Component({
  selector: 'app-wish-list-item',
  template: `
    <app-wish-list-item-content *ngIf="!showForm" [item]="item">
    </app-wish-list-item-content>
    
      <button mat-raised-button style="width: 100%" (click)="showForm = !showForm" *ngIf="!item.addedInstance && !item.wishList.archived">
        <mat-icon>{{showForm ? 'close' : 'add'}}</mat-icon> {{showForm ? 'Close form' : 'Add instance'}}
      </button>
    
    <app-item-instance-for-list-form *ngIf="showForm" class="instance-form" [wishListItem]="item">
    </app-item-instance-for-list-form>
  `,
  styles: ['.instance-form { height: 60vh; position: relative; }']
})
export class WishListItemComponent {

  @Input() item: WishListItem;
  showForm: boolean;

  constructor(public dialogRef: MatDialogRef<WishListItemComponent>,
              @Inject(MAT_DIALOG_DATA) public data: WishListItemComponentData) {
    this.item = data.item;
  }

}




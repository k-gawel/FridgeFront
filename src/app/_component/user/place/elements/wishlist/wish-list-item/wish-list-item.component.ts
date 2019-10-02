import {Component, Inject, Input, OnInit} from '@angular/core';
import {Item} from '../../../../../../_models/response/item/Item';
import {WishListItem} from '../../../../../../_models/response/WishListItem';
import {Category} from '../../../../../../_models/response/Category';
import {ItemInstance} from '../../../../../../_models/response/item/ItemInstance';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

export interface WishListItemComponentData {
  item: WishListItem
}

export class NewInstanceFormSteps {
  category: Category;
  item: Item;
  instance: ItemInstance;
}

@Component({
  selector: 'app-wish-list-item',
  templateUrl: './wish-list-item.component.html',
  styleUrls: ['./wish-list-item.component.css']
})
export class WishListItemComponent implements OnInit {

  @Input() item: WishListItem;

  steps: NewInstanceFormSteps;

  constructor(public dialogRef: MatDialogRef<WishListItemComponent>,
              @Inject(MAT_DIALOG_DATA) public data: WishListItemComponentData) {
    this.item = data.item;
  }

  ngOnInit() {
  }

  openForm() {
    this.steps = new NewInstanceFormSteps();
  }

  closeForm() {
    this.steps = undefined;
  }

}


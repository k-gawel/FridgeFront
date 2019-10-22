import {Component, Input, OnInit, ViewChild} from "@angular/core";
import {WishListItem} from "../../../../../../_models/response/WishListItem";
import {Place} from "../../../../../../_models/response/Place";
import {Category} from "../../../../../../_models/response/Category";
import {Item} from "../../../../../../_models/response/item/Item";
import {MatStepper} from "@angular/material";


@Component({
  selector: 'app-wish-list-item-instance-form',
  styles: ['mat-horizontal-stepper { height: 70vh; position: relative; }'],
  template: `
    <mat-horizontal-stepper #stepper
                            class="no-padding-stepper relative-height-stepper">

      <mat-step>

        <ng-template matStepLabel>Item</ng-template>

        <app-item-picker-with-categories [place]="place"
                                         (selectedItem)="item = $event" (selectedCategory)="category = $event">
        </app-item-picker-with-categories>

      </mat-step>

      <mat-step>

        <ng-template matStepLabel>Instance</ng-template>

        <app-item-instances-for-list-list [category]="category" [item]="item" [wishListItem]="wishListItem">
        </app-item-instances-for-list-list>

      </mat-step>

    </mat-horizontal-stepper>
  `
})
export class WishListItemInstanceFormComponent implements OnInit {

  @ViewChild('stepper', {static: false}) private stepper: MatStepper;
  @Input() wishListItem: WishListItem;

  place: Place;
  category: Category;
  private _item: Item;

  constructor() { }

  ngOnInit() {
    this.place    = this.wishListItem.wishList.place;
    this.category = this.wishListItem.category;
  }

  set item(value: Item) {
    this._item = value;
    this.stepper.next();
  }

  get item(): Item {
    return this._item;
  }


}

import {Component, Input, OnInit, ViewChild} from "@angular/core";
import {MatStepper} from "@angular/material";
import {WishListItem} from "../../../../../_models/response/WishListItem";
import {Place} from "../../../../../_models/response/Place";
import {Category} from "../../../../../_models/response/Category";
import {Item} from "../../../../../_models/response/item/Item";
import {ShopList} from "../../../../../_models/response/ShopList";

@Component({
  selector: 'app-item-instance-for-list-form',
  styles: ['.wish-list-stepper { height: 70vh; position: relative; }'],
  template: `
    <mat-horizontal-stepper #stepper [ngClass]="shopList ? 'dialog-content' : 'wish-list-stepper'"
                            class="no-padding-stepper relative-height-stepper">

      <mat-step label="Item">
        <app-item-picker-with-categories [place]="place"
                                         (selectedItem)="item = $event" (selectedCategory)="category = $event">
        </app-item-picker-with-categories>
      </mat-step>

      <mat-step label="Instance">
        <app-item-instances-for-list-list [category]="category" [item]="item" [wishListItem]="wishListItem" [shopList]="shopList">
        </app-item-instances-for-list-list>
      </mat-step>

    </mat-horizontal-stepper>
  `
})
export class ItemInstanceForListFormComponent implements OnInit {


  @ViewChild('stepper', {static: false}) private stepper: MatStepper;
  @Input() shopList: ShopList;
  @Input() wishListItem: WishListItem;
  place: Place;
  category: Category;
  private _item: Item;

  constructor() { }

  ngOnInit() {
    this.place    = this.wishListItem ? this.wishListItem.wishList.place : this.shopList.place;
    this.category = this.wishListItem ? this.wishListItem.category : Category.rootCategory;
  }

  set item(value: Item) {
    this._item = value;
    this.stepper.next();
  }

  get item(): Item {
    return this._item;
  }


}

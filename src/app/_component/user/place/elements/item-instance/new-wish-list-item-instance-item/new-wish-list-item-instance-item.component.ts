import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Item} from "../../../../../../_models/response/item/Item";
import {WishListItem} from "../../../../../../_models/response/WishListItem";
import {PlaceDetails} from "../../../../../../_models/response/PlaceDetails";
import {ItemInstance} from "../../../../../../_models/response/item/ItemInstance";
import {WishListItemService} from "../../../../../../_service/user/wishlist/wishListItem/wish-list-item.service";
import {ItemInstancesList} from "../../../../../../_models/response/item/ItemInstancesList";
import {Category} from "../../../../../../_models/response/Category";
import {ItemsList} from "../../../../../../_models/response/item/ItemsList";

@Component({
  selector: 'app-new-wish-list-item-instance-item',
  templateUrl: './new-wish-list-item-instance-item.component.html',
  styleUrls: ['./new-wish-list-item-instance-item.component.css']
})
export class NewWishListItemInstanceItemComponent implements OnInit {

  _item: Item;
  _category: Category;
  @Input() wishListItem: WishListItem;

  items: ItemsList = new ItemsList();
  instances: ItemInstancesList = new ItemInstancesList();

  @Output() ready = new EventEmitter();

  places: PlaceDetails[];

  newInstanceForm: boolean = false;

  constructor(private wishListItemService: WishListItemService) {
  }


  ngOnInit() {
    this.places = [this.wishListItem.wishList.place];
  }

  @Input()
  set category(value: Category) {
    if(value == undefined) return;
    this._category = value;
    this.setInstances();
  }

  @Input()
  set item(value: Item) {
    if(value == undefined && this._category == undefined) return;
    this._item = value;
    this.setInstances();
  }


  setInstances() {
    let containers = this.wishListItem.wishList.place.containers;
    let allInstances = containers.getAllInstances().filterByWishListItems(null);
    this.items = new ItemsList();
    if(this._item != null) {
      this.instances = allInstances.filterByItems(this._item);
      this.items.add(this._item);
    } else {
      let finalCategories = this._category.getFinalCategories().map(c => c.id);
      allInstances.getItems()
                  .filter(i => finalCategories.includes(i.category.id))
                  .forEach(i => this.items.add(i));
      this.instances = allInstances.filterByItems(this.items);
    }
  }


  async addInstance(instance: ItemInstance) {
    await this.wishListItemService.addInstance(this.wishListItem, instance);
    this.ready.emit();
  }


}

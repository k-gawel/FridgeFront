import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Item} from "../../../../../../_models/response/item/Item";
import {Category} from "../../../../../../_models/response/Category";
import {WishListItem} from "../../../../../../_models/response/WishListItem";
import {ShopList} from "../../../../../../_models/response/ShopList";
import {ItemInstance} from "../../../../../../_models/response/item/ItemInstance";
import {WishListItemService} from "../../../../../../_service/user/wishlist/wishListItem/wish-list-item.service";
import {ShopListService} from "../../../../../../_service/user/shoplist/shop-list.service";
import {Place} from "../../../../../../_models/response/Place";
import {ItemInstancesList} from "../../../../../../_models/response/item/ItemInstancesList";
import {ItemsList} from "../../../../../../_models/response/item/ItemsList";

@Component({
  selector: 'app-item-instances-for-list-list',
  templateUrl: './item-instances-for-list-list.component.html',
  styleUrls: ['./item-instances-for-list-list.component.css']
})
export class ItemInstancesForListListComponent implements OnInit {

  @Input() wishListItem: WishListItem;
  @Input() shopList: ShopList;
  @Output() added = new EventEmitter<ItemInstance>();

  place: Place;
  items: ItemsList = new ItemsList();
  instances: ItemInstancesList;
  addInstance: (instance: ItemInstance) => void;
  newInstanceForm: Item;


  constructor(private wishListItemService: WishListItemService,
              private shopListService: ShopListService) {
  }

  ngOnInit() {
    if( (this.wishListItem && this.shopList) || (!this.wishListItem && !this.shopList) )
      throw new Error("Among WishListItem and ShopList must be one null and one not-null value.");
    this.addInstance = this.wishListItem != null ? this.addToWishListItem : this.addToShopList;
    this.place  = this.wishListItem != null ? this.wishListItem.wishList.place : this.shopList.place;
    this.category = this.category != null ? this.category : Category.rootCategory;
  }

  @Input() set item(value: Item) {
    this._item = value;
    this.setInstances();
  }

  @Input() set category(value: Category) {
    this._category = value;
    this.setInstances();
  }


  private setInstances() {
    if(this.place == null) return;
    const allInstances = this.filterInstances(this.place.containers.getAllInstances());
    this.items = new ItemsList();
    if(this.item != null)
      this.items.add(this.item);
    else
      allInstances.getItems()
                  .filter(i => this.category.getFinalCategories().includes(i.category))
                  .forEach(i => this.items.add(i));
    this.instances = allInstances.filterByItems(this.items);
  }

  private filterInstances(instances: ItemInstancesList): ItemInstancesList {
    return this.wishListItem != null ?
           instances.filterByWishListItems(null) : instances.filterByShopLists(null);
  }

  private addToShopList(instance: ItemInstance) {
    this.shopListService.addInstance(this.shopList, instance)
                        .then(r => r ? this.added.emit(instance) : undefined);
  }

  private addToWishListItem(instance: ItemInstance) {
    this.wishListItemService.addInstance(this.wishListItem, instance)
                            .then(r => r ? this.added.emit(instance) : undefined);
  }

  private _item: Item;
  private _category: Category;
  get item(): Item { return this._item; }
  get category(): Category { return this._category; }

}

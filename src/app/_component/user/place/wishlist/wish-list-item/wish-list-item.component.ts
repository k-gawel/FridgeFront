import { Component, OnInit, Input } from '@angular/core';
import { WishListItem } from '../../../../../_models/request/WishListItem';
import {ItemService} from '../../../../../_service/user/item/item/item.service';
import {_if} from 'rxjs-compat/observable/if';
import {Item} from '../../../../../_models/request/item/Item';
import {Category} from '../../../../../_models/request/Category';
import {PlaceService} from '../../../../../_service/user/place/place/place.service';
import {ContainersList} from '../../../../../_models/request/Container';
import {WishList} from '../../../../../_models/request/WishList';
import {InstanceService} from '../../../../../_service/user/instance/instance.service';
import {KeyName} from '../../../../../_models/request/KeyName';
import {IdSelector} from "../../../../../_service/utils/EntitySelector";
import {ErrorMessage} from "../../../../../_models/util/ErrorMessage";
import {Error} from "tslint/lib/error";
import {ItemInstancesList} from "../../../../../_models/request/item/ItemInstancesLst";
import {ItemInstance} from "../../../../../_models/request/item/ItemInstance";
import {ErrorHandlerService} from "../../../../../_service/utils/errorhanler/error-handler.service";

@Component({
  selector: 'app-wish-list-item',
  templateUrl: './wish-list-item.component.html',
  styleUrls: ['./wish-list-item.component.css']
})
export class WishListItemComponent implements OnInit {

  type: WishListItemType;

  selectedItem: Item = null;
  selectedCategory: Category;

  _containers: ContainersList;

  @Input() set containers(containers: ContainersList) {
    this._containers = containers;
  }

  itemInstances: ItemInstancesList = new ItemInstancesList();

  placeId: number;

  _item: WishListItem;
  @Input() set item(item: WishListItem) {
    this.selectedItem = null;
    this.selectedCategory = null;

    if(item.wishList instanceof WishList) {

      this.placeId = item.wishList.placeId;
      let itemId: number[] = [];
      itemId.push( item.item instanceof Item  ? item.item.id : item.item );

      let itemIdSelector = new IdSelector(itemId);
      let placeIdSelector = new IdSelector(this.placeId);

      this.instanceService.getByItemsAndPlaces( itemIdSelector, placeIdSelector)
        .then( (res: ItemInstancesList) => {
          this.itemInstances = res
        } )
        .catch((e: ErrorMessage) => {
          this.errorHandler.sendErrors(e);
        });

    }


    if (item.item !== null) {
      this.type = WishListItemType.ITEM;
      // @ts-ignore
      this.selectedItem = item.item;
      // @ts-ignore
      this.selectedCategory = item.item.category;
    }
    if (item.category != null) {
      this.type = WishListItemType.CATEGORY;
      // @ts-ignore
      this.selectedCategory = item.category;
    }
    if (item.item == null && item.category == null) {
      this.type = WishListItemType.COMMENT;
      this.selectedCategory= Category.rootCategory;
    }

    this._item = item;
  }

  constructor(private itemService: ItemService,
              private placeService: PlaceService,
              private instanceService: InstanceService,
              private errorHandler: ErrorHandlerService) { }

  ngOnInit() {
  }

  setSelectedItem(item: Item) {
    if(item === null) return;
    this.selectedItem = item;

    let itemIdSelector = new IdSelector(item.id);
    let placeIdSelector = new IdSelector(this.placeId);

    this.instanceService.getByItemsAndPlaces(itemIdSelector, placeIdSelector)
      .then( (res: ItemInstancesList) => {
        this.itemInstances = res; console.log("New _instances downloaded" + res.size())
      } )
      .catch((e: ErrorMessage) => {
        // TODO error handler
      });
  }

  instanceAdded(instance: ItemInstance) {
    this._item.addedInstance = instance;

  }

}

enum WishListItemType {
  ITEM = 'ITEM',
  CATEGORY = 'CATEGORY',
  COMMENT = 'COMMENT'
}

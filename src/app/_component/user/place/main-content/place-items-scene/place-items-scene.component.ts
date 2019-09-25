import {Component, Input} from '@angular/core';
import {PlaceDetails} from '../../../../../_models/response/PlaceDetails';
import {ContainersList} from '../../../../../_models/response/Container';
import {Category} from '../../../../../_models/response/Category';
import {Item} from '../../../../../_models/response/item/Item';
import {KeyNameList} from '../../../../../_models/response/KeyName';
import {ItemService} from '../../../../../_service/user/item/item/item.service';
import {ItemInstancesList} from '../../../../../_models/response/item/ItemInstancesList';
import {MatDialog} from "@angular/material";
import {DialogService} from "../../../../../_service/utils/dialog.service";
import {ItemsList} from "../../../../../_models/response/item/ItemsList";

@Component({
  selector: 'app-place-items-scene',
  templateUrl: './place-items-scene.component.html',
  styleUrls: ['./place-items-scene.component.css']
})
export class PlaceItemsSceneComponent {

  constructor(private itemService: ItemService,
              public  dialog: MatDialog) {
  }

  owners:   KeyNameList;

  content: string = 'LIST';

  open:    boolean | null = null;
  frozen:  boolean | null = null;
  deleted: boolean | null = false;

  baseInstances: ItemInstancesList = new ItemInstancesList();

  items: ItemsList;


  getVisibleInstances(): ItemInstancesList {
    let result = this.baseInstances.getByOwners(this.owners)
                             .filterByOpen(this.open)
                             .filterByDeleted(this.deleted);
    console.log("Base Instances", this.baseInstances, "Visible instances:", result);
    return result;
  }


  getVisibleItems() {
    let ids = this.getVisibleInstances().getItemIds();
    this.itemService.getItemsByIds(ids)
      .then(r => this.items = r.getByCategory(this._category));
  }


  _place: PlaceDetails;
  _containers: ContainersList = new ContainersList();
  @Input() set containers(containers: ContainersList) {
    if(containers == undefined) return;

    this._containers = containers;
    this._place      = containers.getPlace();
    this.owners      = this._place.users;
    this.baseInstances.addAll(containers.getAllInstances());

    this.getVisibleItems();
  }


  _category: Category = Category.rootCategory;
  @Input() set category(category: Category) {
    if(category == undefined) return;

    this._category = category;
    this.getVisibleItems();
  }


  openItem(item: Item) {
    const datas = {item: item, places: [this._place]};

    const dialogRef = DialogService.createItemComponent(this.dialog, datas);
  }


}

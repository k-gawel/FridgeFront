import {Component, Input} from '@angular/core';
import {PlaceDetails} from '../../../../../_models/response/PlaceDetails';
import {ContainersList} from '../../../../../_models/response/Container';
import {Category} from '../../../../../_models/response/Category';
import {Item} from '../../../../../_models/response/item/Item';
import {KeyNameList} from '../../../../../_models/response/KeyName';
import {ItemService} from '../../../../../_service/user/item/item/item.service';
import {ItemInstanceFilter, ItemInstancesList} from '../../../../../_models/response/item/ItemInstancesList';
import {MatBottomSheet, MatBottomSheetConfig, MatDialog} from "@angular/material";
import {DialogService} from "../../../../../_service/utils/dialog.service";
import {ItemsList} from "../../../../../_models/response/item/ItemsList";
import {CategoriesMenuSheet} from "../../elements/categories-menu/categories-menu.component";

@Component({
  selector: 'app-place-items-scene',
  templateUrl: './place-items-scene.component.html',
  styleUrls: ['./place-items-scene.component.css']
})
export class PlaceItemsSceneComponent {

  _containers: ContainersList = new ContainersList();
  _category: Category = Category.rootCategory;

  _place: PlaceDetails;
  owners: KeyNameList;

  content: string = 'LIST';

  filter: ItemInstanceFilter = new ItemInstanceFilter();
  baseInstances: ItemInstancesList = new ItemInstancesList();
  items: ItemsList = new ItemsList();

  constructor(private itemService: ItemService,
              public  dialog: MatDialog,
              private bottomSheet: MatBottomSheet ) {
  }


  @Input()
  set containers(containers: ContainersList) {
    if(containers == undefined) return;

    this._containers = containers;
    this._place      = containers.getPlace();
    this.owners      = this._place.users;
    this.baseInstances.addAll(containers.getAllInstances());

    this.getVisibleItems();
  }


  @Input()
  set category(category: Category) {
    if(category == undefined) return;

    this._category = category;
    this.getVisibleItems();
  }



  openItem(item: Item) {
    const datas = {item: item, places: [this._place]};

    const dialogRef = DialogService.createItemComponent(this.dialog, datas);
  }


  getVisibleItems() {
    if(this._containers == null || this._category == null)
      return;

    let ids = this.getVisibleInstances().getItemIds();
    this.itemService.getItemsByIds(ids)
      .then(r => { this.items = r.getByCategory(this._category); });
  }


  getVisibleInstances(): ItemInstancesList {
    let result = this.baseInstances.getByOwners(this.owners).filterByProps(this.filter);
    return result;
  }


  openCategoriesSheet() {
    const config = new MatBottomSheetConfig();
    config.data = { category: this._category };

    const ref = this.bottomSheet.open(CategoriesMenuSheet, config);
    ref.afterDismissed().subscribe(() => this.category = ref.instance.chosenCategory)
  }

}

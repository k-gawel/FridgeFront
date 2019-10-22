import {Component, Input, OnInit} from '@angular/core';
import {Place} from '../../../../../_models/response/Place';
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
import {ProducersMenuSheet} from "../producers-menu/producers-menu.component";
import {ProducersList} from "../../../../../_models/response/item/Producer";

@Component({
  selector: 'app-place-items-scene',
  templateUrl: './place-items-scene.component.html',
  styleUrls: ['./place-items-scene.component.css']
})
export class PlaceItemsSceneComponent implements OnInit {

  baseInstances: ItemInstancesList = new ItemInstancesList();
  filter: ItemInstanceFilter = new ItemInstanceFilter();

  baseItems: ItemsList = new ItemsList();
  items: ItemsList = new ItemsList();

  producers: ProducersList = new ProducersList();
  _chosenProducers: ProducersList = new ProducersList();

  @Input() containers: ContainersList;

  _category: Category = Category.rootCategory;
  place: Place;
  owners: KeyNameList;

  content: string = 'LIST';


  constructor(private itemService: ItemService,
              public  dialog: MatDialog,
              private bottomSheet: MatBottomSheet ) {
  }


  ngOnInit(): void {
    this.place = this.containers.getPlace();
    this.baseInstances = this.containers.getAllInstances();
    this.owners = this.place.users;

    this.baseItems.addAll(this.baseInstances.getItems());
    this.items.addAll(this.baseInstances.getItems());

    this.producers.addAll(this.baseItems.getProducers());
    this._chosenProducers.addAll(this.baseItems.getProducers());
  }


  set chosenProducers(producers: ProducersList) {this._chosenProducers = producers;
    this.setVisibleItems();
  }


  set category(category: Category) {
    this._category = category;
    this.items = this.baseItems.getByCategory(this._category);
    this.producers = this.items.getProducers();
    this.chosenProducers = this.items.getProducers();
    this.setVisibleItems();
  }


  setVisibleItems() {
    let instances = this.getVisibleInstances();
    this.items = instances.getItems().getByCategory(this._category)
                                     .getByProducers(this._chosenProducers);
  }


  getVisibleInstances(): ItemInstancesList {
    return this.baseInstances.getByOwners(this.owners).filterByProps(this.filter);
  }


  openItem(item: Item) {
    console.log("Opening item", item);
    const dialogRef = DialogService.createItemComponent(this.dialog, {item: item, places: [this.place]})
  }

  openCategoriesSheet() {
    const config = new MatBottomSheetConfig();
    config.data = { category: this._category };
    config.panelClass = 'full-width';

    const ref = this.bottomSheet.open(CategoriesMenuSheet, config);
    ref.afterDismissed().subscribe(() => this.category = ref.instance.chosenCategory);
  }


  openProducersSheet() {
    const config = new MatBottomSheetConfig();
    config.data  = { producers: this.producers, selectedProducers: this._chosenProducers };
    config.panelClass = 'full-width';

    const ref = this.bottomSheet.open(ProducersMenuSheet, config);
    ref.afterDismissed().subscribe(() => this.chosenProducers = ref.instance.chosenProducers );
  }

}

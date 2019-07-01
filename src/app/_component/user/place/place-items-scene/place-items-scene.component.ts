import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {PlaceDetails, PlaceDetailsList} from '../../../../_models/response/PlaceDetails';
import {PlaceUsersList} from '../../../../_models/response/place-user/PlaceUsersList';
import {ContainersList} from '../../../../_models/response/Container';
import {Category} from '../../../../_models/response/Category';
import {Item} from '../../../../_models/response/item/Item';
import {Observable, Subscription} from 'rxjs';
import {KeyNameList} from '../../../../_models/response/KeyName';
import {ItemService} from '../../../../_service/user/item/item/item.service';
import {InstanceService, ItemInstanceQuery} from '../../../../_service/user/instance/instance.service';
import {InstanceChangeList} from '../../../../_models/response/InstanceChange';
import {LoggerServiceService} from '../../../../_service/user/user/logger/logger-service.service';
import {IdSelector} from '../../../../_service/utils/EntitySelector';
import {ErrorMessage} from '../../../../_models/util/ErrorMessage';
import {ErrorHandlerService} from '../../../../_service/utils/errorhanler/error-handler.service';
import {ItemsList} from '../../../../_models/response/item/ItemsList';
import {ItemInstancesList} from '../../../../_models/response/item/ItemInstancesList';
import {ItemInstance} from '../../../../_models/response/item/ItemInstance';

@Component({
  selector: 'app-place-items-scene',
  templateUrl: './place-items-scene.component.html',
  styleUrls: ['./place-items-scene.component.css']
})
export class PlaceItemsSceneComponent implements OnInit, OnDestroy {

  constructor(private itemService: ItemService,
              private instanceService: InstanceService,
              private loggerService: LoggerServiceService,
              private errorHandler: ErrorHandlerService) {
  }

  owners:   KeyNameList;

  open:    boolean | null = null;
  frozen:  boolean | null = null;
  deleted: boolean | null = false;

  baseInstances: ItemInstancesList = new ItemInstancesList();

  instancesLogs: InstanceChangeList = null;

  items: Item[] = [];


  selectedItem: Item = null;
  setSelectedItem(item: Item) {
    console.debug("PlaceItemsSceneComponent.setSelectedItem()", item);
    this.selectedItem = item;
  }

  getVisibleInstances(): ItemInstancesList {
    return this.baseInstances.getByOwners(this.owners)
                             .filterByOpen(this.open)
                             .filterByDeleted(this.deleted);
  }

  getVisibleItems() {
    let ids = this.getVisibleInstances().getItemIds();
    this.itemService.getItemsByIds(ids)
                    .then(r => r.getByCategory(this._category))
                    .then(r => r.toArray())
                    .then(r => this.items = <Item[]> r);
  }

  _containers: ContainersList = new ContainersList();
  @Input() set containers(containers: ContainersList) {
    if(containers == undefined) return;

    this._containers = containers;
    this._place      = containers.getPlace();
    this.owners      = this._place.users;
    this.baseInstances = containers.getAllInstances();
    this.getVisibleItems();
  }


  _category: Category = Category.rootCategory;
  @Input() set category(category: Category) {
    if(category == undefined) return;

    this._category = category;
    this.getVisibleItems();
  }

  _place: PlaceDetails;
  users: KeyNameList = PlaceUsersList.ALL;


  newInstance(instance: ItemInstance) {
    this.baseInstances.push(instance);
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.instanceService.$deletedInstance.unsubscribe();
  }

}

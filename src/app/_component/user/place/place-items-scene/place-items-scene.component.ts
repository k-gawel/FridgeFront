import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {PlaceDetails} from '../../../../_models/request/PlaceDetails';
import {PlaceUsersList} from '../../../../_models/request/place-user/PlaceUsersList';
import {ContainersList} from '../../../../_models/request/Container';
import {Category} from '../../../../_models/request/Category';
import {Item} from '../../../../_models/request/item/Item';
import {Subscription} from 'rxjs';
import {KeyNameList} from '../../../../_models/request/KeyName';
import {ItemService} from '../../../../_service/user/item/item/item.service';
import {InstanceService, ItemInstanceQuery} from '../../../../_service/user/instance/instance.service';
import {InstanceChangeList} from '../../../../_models/request/InstanceChange';
import {LoggerServiceService} from '../../../../_service/user/user/logger/logger-service.service';
import {IdSelector} from '../../../../_service/utils/EntitySelector';
import {ErrorMessage} from '../../../../_models/util/ErrorMessage';
import {ErrorHandlerService} from '../../../../_service/utils/errorhanler/error-handler.service';
import {ItemsList} from '../../../../_models/request/item/ItemsList';
import {ItemInstancesList} from '../../../../_models/request/item/ItemInstancesLst';
import {ItemInstance} from '../../../../_models/request/item/ItemInstance';

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


  instancesLogs: InstanceChangeList = null;

  selectedItem: Item = null;
  setSelectedItem(item: Item) {
    console.debug("PlaceItemsSceneComponent.setSelectedItem()", item);
    this.selectedItem = item;
  }


  _containers: ContainersList = new ContainersList();
  @Input() set containers(containers: ContainersList) {
    console.debug("PlaceItemsSceneComponent.setContainers()", containers);
    this._containers = containers;
    this.visibleInstances = this.instances.getByContainers(containers);
  }


  _category: Category = Category.rootCategory;
  @Input() set category(category: Category) {
    console.debug("PlaceItemsSceneComponent.setCategory()", category);
    this._category = category;
    this.setVisibleItems();
  }


  _place: PlaceDetails = new PlaceDetails();
  users: KeyNameList = PlaceUsersList.ALL;
  @Input() set place(place: PlaceDetails) {
    console.debug("PlaceItemsSceneComponent.setPlace()", place);

    this._place = place;

    let query = new ItemInstanceQuery();
    query.places = new IdSelector(place).id;
    query.deleted = false;

    this.instanceService.get(query)
      .then( (res: ItemInstancesList) => {
        this.setInstances(res);
      })
      .catch((e: ErrorMessage) => {
        this.errorHandler.sendErrors(e);
      });
  }


  instances: ItemInstancesList = new ItemInstancesList();
  visibleInstances: ItemInstancesList = new ItemInstancesList();
  newInstance(instance: ItemInstance) {
    this.instances = <ItemInstancesList> this.instances.push(instance);
    this.visibleInstances = <ItemInstancesList> this.visibleInstances.push(instance);
    this.itemService.getItemById(instance.itemId)
      .then((item: Item) => {
        this.items.push(item);
        this.visibleItems.push(item);
      })
  }


  deleteInstance(instance: ItemInstance) {
    console.debug("PlaceItemsSceneComponent.deleteInstance()", instance);
    this.visibleInstances = this.visibleInstances.remove(instance);
    this.visibleItems = this.visibleItems.getByIds(this.visibleInstances.getItemIds());
  }


  items: ItemsList = new ItemsList();
  visibleItems: ItemsList = new ItemsList();
  setInstances(instances: ItemInstancesList) {
    console.debug("PlaceItemsScene.setInstances()", instances);
    this.instances = instances;
    this.visibleInstances = this.instances.getByContainers(this._containers);

    let itemIds = this.instances.getItemIds();
    let visibleItemIds = this.visibleInstances.getItemIds();
    this.itemService.getItemsByIds(itemIds)
      .then((items: ItemsList) => {
        console.log("PlaceItemsScene.setInstances() items", items);
        this.items = items;
        this.setVisibleItems();
      })
      .catch((e: ErrorMessage) => {
        this.errorHandler.sendErrors(e);
      })
  }


  setVisibleItems() {
    console.debug("PlaceItemsScene.setVisibleItems()");
    let visibleItemIds = this.visibleInstances.getItemIds();
    this.visibleItems = new ItemsList();
    visibleItemIds.forEach((id: number) => {
      this.visibleItems.push(this.items.getById(id));
    });
    console.debug("PlaceItemsScene.setVisibleItems() visibleItems of instances", this.visibleItems);
    this.visibleItems = this.visibleItems.getByCategory(this._category);
  }

  deletedInstanceSubscription: Subscription;
  ngOnInit() {
    this.users = PlaceUsersList.ALL;
    this.deletedInstanceSubscription = this.instanceService.$deletedInstance.subscribe((instance: ItemInstance) => {
      this.deleteInstance(instance);
    })
  }


  ngOnDestroy() {
    this.deletedInstanceSubscription.unsubscribe();
  }

}

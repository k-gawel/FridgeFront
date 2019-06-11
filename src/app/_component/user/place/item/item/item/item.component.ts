import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {ItemContent} from "../../../../../../_models/util/Content";
import {KeyNameList} from "../../../../../../_models/request/KeyName";
import {ContainersList} from "../../../../../../_models/request/Container";
import {EntityList} from "../../../../../../_models/request/Entity";
import {ItemInstancesList} from "../../../../../../_models/request/item/ItemInstancesLst";
import {ItemInstance} from "../../../../../../_models/request/item/ItemInstance";
import {Item} from "../../../../../../_models/request/item/Item";
import {PlaceUsersList} from "../../../../../../_models/request/place-user/PlaceUsersList";

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {


  _content: ItemContent;
  _collapsed: boolean = true;
  expand(content: ItemContent) {

    if(this._content == content) {
      this._collapsed = true;
      this._content = null;
    } else if(this._content == null) {
      this._collapsed = false;
      this._content = content;
    } else {
      this._content = content;
    }

  }

  // SETTINGS
  @Input() fullScreen: boolean = true;
  @Input() chosen: boolean = false;
  @Output() closed = new EventEmitter<boolean>();
  close() {
    this.closed.emit(true);
  }


  componentId: number;


  // FORM DETAILS
  users: KeyNameList;


  // CONTAINERS
  containers: ContainersList = new ContainersList();
  visibleContainers: ContainersList = new ContainersList();
  @Input() set chosenContainers(containers: ContainersList) {
    console.debug(this.componentId, "ItemComponent.setChosenContainers()", containers);

    if(containers == null && containers.size() === 0)
      return;

    if(this.containers == null || this.containers.size() === 0)
      this.containers = containers;

    this.visibleContainers = <ContainersList> EntityList.intersect(this.visibleContainers, containers);
  }


  // INSTANCES
  currentInstances: ItemInstancesList = new ItemInstancesList();
  _instances: ItemInstancesList = new ItemInstancesList(); // ALL PLACES INSTANCES
  @Input() set instances(instances: ItemInstancesList) {
    console.debug(this.componentId, "ItemComponent.setInstances()", instances);

    if(this._instances == null)
      return;

    this._instances = instances;
    this.currentInstances = instances.filtrByDeleted(false);
    this.visibleContainers = this._instances.getContainers();
  }


  @Output() newItemInstance = new EventEmitter<ItemInstance>();


  _item: Item = null;
  @Input() set item(item: Item) {
    console.debug(this.componentId, "ItemComponent.setItem()", item);

    if(item == null)
      return;

    if(this._item === null) {
      this._item = item;
      return;
    }

    this._item = item;
  }

  private getItemId(): number {
    return this._item !== null ? this._item.id : null;
  }


  constructor() {
    this.componentId = Math.random();
  }


  ngOnInit() {
    this.users = PlaceUsersList.ALL;
  }





}

import {Component, ElementRef, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ItemContent} from '../../../../../../_models/util/Content';
import {KeyNameList} from '../../../../../../_models/response/KeyName';
import {ContainersList} from '../../../../../../_models/response/Container';
import {EntityList} from '../../../../../../_models/response/Entity';
import {ItemInstancesList} from '../../../../../../_models/response/item/ItemInstancesList';
import {ItemInstance} from '../../../../../../_models/response/item/ItemInstance';
import {Item} from '../../../../../../_models/response/item/Item';
import {PlaceUsersList} from '../../../../../../_models/response/place-user/PlaceUsersList';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  componentId = Math.random();

  wrapWS: boolean = false;

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


  // FORM DETAILS
  users: KeyNameList;


  // CONTAINERS
  containers: ContainersList = new ContainersList();
  visibleContainers: ContainersList = new ContainersList();
  @Input() set chosenContainers(containers: ContainersList) {
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
    if(this._instances == null)
      return;

    this._instances = instances;
    this.currentInstances = instances.filterByDeleted(false);
    this.visibleContainers = this._instances.getContainers();
  }


  @Output() newItemInstance = new EventEmitter<ItemInstance>();


  _item: Item = null;
  @Input() set item(item: Item) {
    if(item == null)
      return;
    else if(this._item === null) {
      this._item = item;
    } else {
      this._item = item;
    }

  }

  private getItemId(): number {
    return this._item !== null ? this._item.id : null;
  }


  constructor(private eL: ElementRef) {
    this.users = PlaceUsersList.ALL;
  }

  ngOnInit() {
  }


}

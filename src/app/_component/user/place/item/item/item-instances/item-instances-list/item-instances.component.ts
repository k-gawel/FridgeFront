import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ItemInstancesList} from "../../../../../../../_models/request/item/ItemInstancesLst";
import {ItemInstance} from "../../../../../../../_models/request/item/ItemInstance";

@Component({
  selector: 'app-item-instances',
  templateUrl: './item-instances.component.html',
  styleUrls: ['./item-instances.component.css']
})
export class ItemInstancesComponent implements OnInit {


  @Input() showItem: Boolean = false;

  _instances: ItemInstancesList;
  @Input() set instances(instances: ItemInstancesList) {
    console.debug("ItemInstancesComponent.setInstances()", instances);
    this._instances = instances;
  }

  constructor() {
  }

  ngOnInit() {
  }

}

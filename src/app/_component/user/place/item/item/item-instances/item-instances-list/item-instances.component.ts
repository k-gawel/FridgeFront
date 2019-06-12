import {Component, Input, OnInit} from '@angular/core';
import {ItemInstancesList} from '../../../../../../../_models/request/item/ItemInstancesLst';

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

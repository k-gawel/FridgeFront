import {Component, Input, OnInit} from '@angular/core';
import {ItemInstancesList} from '../../../../../../../_models/response/item/ItemInstancesList';

@Component({
  selector: 'app-item-instances',
  templateUrl: './item-instances.component.html',
  styleUrls: ['./item-instances.component.css']
})
export class ItemInstancesComponent implements OnInit {


  @Input() showItem: Boolean = false;

  _instances: ItemInstancesList;
  @Input() set instances(instances: ItemInstancesList) {
    this._instances = instances;
  }

  constructor() {
  }

  ngOnInit() {
  }

}

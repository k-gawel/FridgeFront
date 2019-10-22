import {Component, Input, OnInit} from '@angular/core';
import {Item} from "../../../../../../_models/response/item/Item";
import {Place} from "../../../../../../_models/response/Place";
import {ItemInstancesList} from "../../../../../../_models/response/item/ItemInstancesList";
import {ItemInstanceParams, ItemInstanceQuery} from "../../../../../../_models/request/iteminstance/ItemInstanceQuery";
import {ItemInstance} from "../../../../../../_models/response/item/ItemInstance";
import {ItemInstanceService} from "../../../../../../_service/user/instance/item-instance.service";
import {OffsetLimit} from "../../../../../../_util/OffsetLimit";

@Component({
  selector: 'app-item-instances-list',
  templateUrl: './item-instances-list.component.html',
  styleUrls: ['./item-instances-list.component.css']
})
export class ItemInstancesListComponent implements OnInit {

  @Input() item: Item;
  @Input() places: Place[];

  deleted: ItemInstance[] = [];
  props: ItemInstanceParams = new ItemInstanceParams(null, null, false);

  constructor(private itemInstanceService: ItemInstanceService) { }

  ngOnInit() {
  }


  get instances(): ItemInstancesList {
    this._instances = new ItemInstancesList();
    this.places.map(p => p.containers)
      .map(c => c.getAllInstances().filterByItems(this.item))
      .map(l => l.filterByProps(this.props))
      .forEach(l => l.forEach(ii => this._instances.add(ii)));
    return this._instances;
  }


  deletedOffset: number = 0;
  readonly limit: number = 10;
  fetchDeleted() {
    if(this.deletedOffset == null) return;

    let processResult = (ii: ItemInstancesList) => {
      ii.forEach(i => this.deleted.push(i));
      this.deletedOffset = ii.size() < 10 ? null : this.deletedOffset + 10;
    };


    let query = new ItemInstanceQuery();
    query.items = [this.item.id];
    query.containers = this.containerIds;
    query.offsetLimit = new OffsetLimit(this.deletedOffset, this.limit);
    query.params = new ItemInstanceParams(null, null, true);

    this.itemInstanceService.get(query).then(processResult);
  }


  get containerIds(): number[] {
    let result = [];
    this.places.map(p => p.containers)
               .map(c => c.getAllIds())
               .forEach(ids => result.push(ids));
    return result;
  }

  private _instances: ItemInstancesList;
  set instances(value: ItemInstancesList) {
    this._instances = value;
  }


}

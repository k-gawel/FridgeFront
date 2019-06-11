import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ItemInstance} from "../../../../../../../_models/request/item/ItemInstance";
import {ItemService} from "../../../../../../../_service/user/item/item/item.service";
import {InstanceService} from "../../../../../../../_service/user/instance/instance.service";
import {Item} from "../../../../../../../_models/request/item/Item";
import {Container, ContainersList} from "../../../../../../../_models/request/Container";
import {KeyName} from "../../../../../../../_models/request/KeyName";
import {ErrorMessage} from "../../../../../../../_models/util/ErrorMessage";
import {PlaceUsersList} from "../../../../../../../_models/request/place-user/PlaceUsersList";
import {JavaLocalDate, LocalDate} from "../../../../../../../_util/date/JavaLocalDate";


@Component({
  selector: '[single-instance]',
  templateUrl: './single-instance.component.html',
  styleUrls: ['./single-instance.component.css']
})
export class SingleInstanceComponent implements OnInit {


  readyToDisplay: boolean = false;


  @Input() showItem: boolean = false;


  @Input() set instance(value: ItemInstance) {
    console.log("SingleInstanceComponent.setInstance()", value);

    this._instance = value;

    this.addedUser = PlaceUsersList.ALL.getById(value.addedById);
    console.log("SingleInstanceComponent.setInstance() addedUser:", this.addedUser);
    console.log("SingleInstanceComponent.setInstance() PlaceUsersList.ALL", PlaceUsersList.ALL);


    this.openUser = PlaceUsersList.ALL.getById(value.openById);

    this.deleteUser = PlaceUsersList.ALL.getById(value.deletedById);

    this.itemService.getItemById(value.itemId).then((res: Item) => this.item = res);

    this.container = ContainersList.ALL.getById(value.containerId);

    this.readyToDisplay = true;
  }


  constructor(private itemService: ItemService,
              private instanceService: InstanceService) {
  }

  _instance: ItemInstance;

  item: Item;
  container: Container;

  addedUser: KeyName;
  openUser: KeyName;
  deleteUser: KeyName;


  ngOnInit() {
  }


  openInstance(): void {
    this.instanceService.openInstance(this._instance)
      .then( () => {
        this.openUser = PlaceUsersList.ALL.getById(this._instance.openById);
      })
      .catch((error: ErrorMessage) => {
        this.showError(error);
      });
  }


  deleteInstance(): void {
    this.instanceService.deleteInstance(this._instance)
      .then(() => {
        this.deleteUser = PlaceUsersList.ALL.getById(this._instance.deletedById);
      })
      .catch((error: ErrorMessage) =>{
        this.showError(error);
      })
  }


  private showError(error: ErrorMessage) {
    //TODO Show Error itemId instance
  }

}

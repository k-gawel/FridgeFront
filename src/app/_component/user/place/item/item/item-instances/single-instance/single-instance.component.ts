import {Component, Input, OnInit} from '@angular/core';
import {ItemInstance} from '../../../../../../../_models/response/item/ItemInstance';
import {ItemService} from '../../../../../../../_service/user/item/item/item.service';
import {InstanceService} from '../../../../../../../_service/user/instance/instance.service';
import {Item} from '../../../../../../../_models/response/item/Item';
import {Container, ContainersList} from '../../../../../../../_models/response/Container';
import {KeyName} from '../../../../../../../_models/response/KeyName';
import {ErrorMessage} from '../../../../../../../_models/util/ErrorMessage';
import {PlaceUsersList} from '../../../../../../../_models/response/place-user/PlaceUsersList';


@Component({
  selector: '[single-instance]',
  templateUrl: './single-instance.component.html',
  styleUrls: ['./single-instance.component.css']
})
export class SingleInstanceComponent implements OnInit {


  readyToDisplay: boolean = false;


  @Input() showItem: boolean = false;


  @Input() set instance(value: ItemInstance) {

    this._instance = value;

    this.addedUser = PlaceUsersList.ALL.getById(value.addedById);

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

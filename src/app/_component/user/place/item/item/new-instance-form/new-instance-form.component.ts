import {Component, OnInit, Input, Output, EventEmitter, OnDestroy} from '@angular/core';
import {ContainersList} from "../../../../../../_models/request/Container";
import {ItemInstanceForm} from "../../../../../../_models/response/ItemInstanceForm";
import {Item} from "../../../../../../_models/request/item/Item";
import {ItemInstance} from "../../../../../../_models/request/item/ItemInstance";
import {UserService} from "../../../../../../_service/user/user/user.service";
import {PlaceService} from "../../../../../../_service/user/place/place/place.service";
import {InstanceService} from "../../../../../../_service/user/instance/instance.service";
import {ErrorMessage} from "../../../../../../_models/util/ErrorMessage";
import {NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";


@Component({
  selector: 'app-new-instance-form',
  templateUrl: './new-instance-form.component.html',
  styleUrls: ['./new-instance-form.component.css']
})
export class NewInstanceFormComponent implements OnInit, OnDestroy {

  @Input() item: Item;
  @Input() containers: ContainersList;
  @Output() newInstance = new EventEmitter<ItemInstance>();

  selectedDate: NgbDateStruct;
  form: ItemInstanceForm = new ItemInstanceForm();

  constructor(private userService: UserService,
              private placeService: PlaceService,
              private instanceSerice: InstanceService) {
   }

   ngOnInit() {
     console.debug("new NewInstanceFormComponent() itemId: {}, containers: {}", this.item, this.containers);
     this.form.itemId = this.item.id;
   }

   submit() {
      console.debug("NewInstanceFormComponent.submit()");

      if(!this.form.validate()) {
        console.debug("NewInstanceFormComponent.submit() form not valid", this.form.errors);
        return;
      }

      this.instanceSerice.addInstance(this.form)
        .then( (res: ItemInstance) => {
          if(res == null)
            throw new ErrorMessage("instancecreate.unable");
          else this.newInstance.emit(res);
        } )
        .catch((error: ErrorMessage) => {
          this.form.errors = error;
        });
   }

   onDateChange() {
    this.form.expireDate = new Date(this.selectedDate.year + "-" + this.selectedDate.month + "-" + this.selectedDate.day);
   }

   ngOnDestroy(): void {
   }
}

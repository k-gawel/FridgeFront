import {Form} from './Form';

export class ItemInstanceForm extends Form {


    itemId: number;
    containerId: number;
    expireDate: Date;
    comment: string;

    validate(): boolean {
      super.validate();
      return this.validateComment() && this.validateContainerId() && this.validateContainerId() && this.validateItemId();
    }

    validateItemId(): boolean {
      if(this.itemId == null) {
        this.sendMessage("itemid.nullable");
        return false;
      }
      if(this.itemId === 0) {
        this.sendMessage("itemid.zero");
        return false;
      }
      return true;
    }

    validateContainerId(): boolean {
      if(this.containerId == null) {
        this.sendMessage("containerid.nullable");
        return false;
      }
      if(this.containerId === 0) {
        this.sendMessage("containerid.zero");
        return false;
      }
      return true;
    }

    validateExpireDate(): boolean {
      if(this.expireDate == null) {
        this.sendMessage("expire_date.nullable");
        return false;
      }
      return true;
    }

    validateComment(): boolean {
      return true;
    }

}

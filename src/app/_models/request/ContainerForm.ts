import {Form} from './Form';

export class ContainerForm extends Form {

    placeId: number = 0;
    name: string = "";

    validate(): boolean {
      super.validate();
      return this.validateName() && this.validatePlaceId();
    }

    private validateName(): boolean {
      if(this.name == null) {
        this.sendMessage("containername.nullable");
        return false;
      }
      if(this.name.length < 5 || this.name.length > 25) {
        this.sendMessage("containername.size");
        return false;
      }
      return true;
    }

    private validatePlaceId(): boolean {
      if(this.placeId == null) {
        this.sendMessage("containerplaceid.nullable");
        return false;
      }
      return true;
    }






}

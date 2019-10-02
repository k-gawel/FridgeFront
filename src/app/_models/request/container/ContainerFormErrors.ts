import {FormErrors} from "../FormError";

export class ContainerFormErrors extends FormErrors {

  constructor() {
    super();
    this.init("place");
    this.init("name");
  }

}

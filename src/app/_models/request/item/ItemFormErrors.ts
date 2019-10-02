import {FormErrors} from "../FormError";

export class ItemFormErrors extends FormErrors {

  constructor() {
    super();
    this.init("name");
    this.init("place");
    this.init("category");
  }

}

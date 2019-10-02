import {FormErrors} from "../FormError";

export class ShopListFormErrors extends FormErrors {

  constructor() {
    super();
    this.init("place");
    this.init("user");
  }

}

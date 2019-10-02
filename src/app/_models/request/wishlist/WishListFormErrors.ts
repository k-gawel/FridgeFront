import {FormErrors} from "../FormError";

export class WishListFormErrors extends FormErrors {

  constructor() {
    super();
    this.init("name");
    this.init("place");
    this.init("user");
  }

}

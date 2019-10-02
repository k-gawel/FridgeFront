import {FormErrors} from "../FormError";

export class AccountFormErrors extends FormErrors {

  constructor() {
    super();
    this.init("name");
    this.init("email");
    this.init("password");
    this.init("passwords");
  }

}

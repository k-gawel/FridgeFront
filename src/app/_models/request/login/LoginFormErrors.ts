import {FormErrors} from "../FormError";

export class LoginFormErrors extends FormErrors {

  constructor() {
    super();
    this.init("datas");
    this.init("name");
    this.init("password");
  }

}

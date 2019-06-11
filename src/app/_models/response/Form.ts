import {Validatable} from "../validator/validatable";
import {ErrorMessage} from "../util/ErrorMessage";

export class Form implements Validatable {

  errors: ErrorMessage;

  sendMessage(message: string) {
    if(this.errors == null)
      this.errors = new ErrorMessage(message);
    else
      this.errors.putMessage(message);
  }

  validate(): boolean {
    this.errors = null;
    return false;
  }

}

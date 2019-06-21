import {Form} from './Form';

export class AccountForm extends Form {

  name: string;
  email: string;
  password1: string;
  password2: string;

  validate(): boolean {
    super.validate();
    return this.validateName() && this.validateEmail() && this.validatePasswords();
  }


  validateName(): boolean {
    if(this.name == null) {
      this.sendMessage("name.nullable");
      return false;
    } else if(this.name.length < 5) {
      this.sendMessage("name.too_short");
      return false;
    } else if(this.name.length > 40) {
      this.sendMessage("name.too_long");
      return false;
    } else
      return true;
  }


  validateEmail(): boolean {
    return true;
  }


  validatePasswords(): boolean {
    if(this.password1 == null || this.password2 == null) {
      this.sendMessage("password.null");
      return false;
    } else if(this.password1 !== this.password2) {
      this.sendMessage("password.doesn't_match");
      return false;
    } else
      return true;
  }


}

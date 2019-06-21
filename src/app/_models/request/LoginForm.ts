import {Form} from './Form';

export class LoginForm extends Form {
    name: string;
    password: string;

    validate(): boolean {
      super.validate();
      return this.validateName() && this.validatePassword();
    }

    validateName(): boolean {

      if(this.name == null || this.name.length == 0) {
        this.sendMessage("Name must not be empty");
        return false;
      }

      return true;
    }

    validatePassword(): boolean {

      if(this.password == null || this.name.length == 0) {
        this.sendMessage("Password must not be empty");
        return false;
      }

      return true;
    }

}

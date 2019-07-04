import {Form} from './Form';

export class LoginForm extends Form {
    name: string;
    password: string;
    nameError: string;
    passwordError: string;

    validate(): boolean {
      super.validate();
      this.passwordError = null;
      this.nameError = null;
      return this.validateName() && this.validatePassword();
    }

    validateName(): boolean {
      if(this.name == null || this.name.length == 0) {
        this.nameError = "Name must not be empty";
        return false;
      }

      return true;
    }

    validatePassword(): boolean {
      if(this.password == null || this.password.length == 0) {
        this.passwordError = "Password must not be empty";
        return false;
      }

      return true;
    }

}

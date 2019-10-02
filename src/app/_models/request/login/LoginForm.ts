import {Form} from '../Form';
import {FormErrors} from "../FormError";
import {LoginFormErrorMessages} from "./LoginFormErrorMessages";
import {LoginFormErrors} from "./LoginFormErrors";
import {FormErrorMessages} from "../FormErrorMessages";

export class LoginForm extends Form {

  name: string;
  password: string;

  private static readonly _messages = new LoginFormErrorMessages();
  private _errors = new LoginFormErrors();

  get errors(): FormErrors {
    return this._errors;
  }

  get messages(): FormErrorMessages {
    return LoginForm._messages;
  }

  restartErrors(): void {
    this._errors = new LoginFormErrors();
  }

}



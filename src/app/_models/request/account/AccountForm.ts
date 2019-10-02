import {Form} from "../Form";
import {FormErrors} from "../FormError";
import {IsEmail, Length} from "class-validator";
import {AccountFormErrors} from "./AccountFormErrors";
import {AccountFormErrorsMessages} from "./AccountFormErrorsMessages";
import {FormErrorMessages} from "../FormErrorMessages";
import {ErrorCode} from "../ErrorCode";


export class AccountForm extends Form {

  @Length(5, 30, { message: ErrorCode.NAME.LENGTH } )
  name: string;

  @IsEmail(undefined, { message: ErrorCode.EMAIL.FORMAT})
  email: string;

  @Length(6, 255, {message: ErrorCode.PASSWORD.LENGTH })
  password1: string;
  password2: string;

  private static readonly _messages = new AccountFormErrorsMessages();
  private _errors = new AccountFormErrors();


  get errors(): FormErrors {
    return undefined;
  }

  get messages(): FormErrorMessages {
    return AccountForm._messages;
  }

  restartErrors(): void {
    this._errors = new AccountFormErrors();
  }

}




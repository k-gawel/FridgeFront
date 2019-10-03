import {Form} from '../Form';
import {Length, Min} from "class-validator";
import {FormErrors} from "../FormError";
import {WishListFormErrors} from "./WishListFormErrors";
import {WishListFormErrorMessages} from "./WishListFormErrorMessages";
import {FormErrorMessages} from "../FormErrorMessages";
import {ErrorCode} from "../ErrorCode";


export class WishListForm extends Form {

  @Length(5, 30, { message: ErrorCode.NAME.LENGTH })
  name: string;

  @Min(0, { message: ErrorCode.USER.NULL })
  author: number;

  @Min(0, { message: ErrorCode.PLACE.NULL })
  place: number;

  description: string;

  private static readonly _messages = new WishListFormErrorMessages();
  private _errors = new WishListFormErrors();

  get errors(): FormErrors {
    return this._errors;
  }

  get messages(): FormErrorMessages {
    return WishListForm._messages;
  }

  restartErrors(): void {
    this._errors = new WishListFormErrors();
  }

}


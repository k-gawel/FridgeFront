import {Form} from "../Form";
import {Min} from "class-validator";
import {FormErrors} from "../FormError";
import {ShopListFormErrorMessages} from "./ShopListFormErrorMessages";
import {ShopListFormErrors} from "./ShopListFormErrors";
import {FormErrorMessages} from "../FormErrorMessages";
import {ErrorCode} from "../ErrorCode";


export class ShopListForm extends Form {

  @Min(0, { message: ErrorCode.PLACE.NULL })
  place: number;

  @Min(0, { message: ErrorCode.USER.NULL })
  author: number;

  shopName: string;
  description: string;

  private static readonly _messages = new ShopListFormErrorMessages();
  private _errors = new ShopListFormErrors();


  get errors(): FormErrors {
    return this._errors;
  }

  get messages(): FormErrorMessages {
    return ShopListForm._messages;
  }

  restartErrors(): void {
    this._errors = new ShopListFormErrors();
  }

}


import {Form} from '../Form';
import {Length} from "class-validator";
import {FormErrors} from "../FormError";
import {PlaceFormErrorMessages} from "./PlaceFormErrorMessages";
import {PlaceFormErrors} from "./PlaceFormErrors";
import {FormErrorMessages} from "../FormErrorMessages";
import {ErrorCode} from "../ErrorCode";

export class PlaceForm extends Form {

  @Length(5, 30, { message: ErrorCode.NAME.LENGTH })
  name: String;

  private static readonly _messages = new PlaceFormErrorMessages();
  private _errors = new PlaceFormErrors();


  get errors(): FormErrors {
    return this._errors;
  }

  get messages(): FormErrorMessages {
    return PlaceForm._messages;
  }

  restartErrors(): void {
    this._errors = new PlaceFormErrors();
  }

}



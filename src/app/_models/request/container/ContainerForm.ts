import {Form} from '../Form';
import {FormErrors} from "../FormError";
import {Length, Min} from "class-validator";
import {ContainerFormErrorMessages} from "./ContainerFormErrorMessages";
import {ContainerFormErrors} from "./ContainerFormErrors";
import {FormErrorMessages} from "../FormErrorMessages";
import {ErrorCode} from "../ErrorCode";

export class ContainerForm extends Form {

  @Min(0, { message: ErrorCode.PLACE.NULL } )
  placeId: number;

  @Length(5, 30, { message: ErrorCode.NAME.LENGTH })
  name: string;

  private _errors = new ContainerFormErrors();
  private static readonly _messages = new ContainerFormErrorMessages();

  get errors(): FormErrors {
    return this._errors;
  }

  get messages(): FormErrorMessages {
    return ContainerForm._messages;
  }

  restartErrors(): void {
    this._errors = new ContainerFormErrors();
  }

}



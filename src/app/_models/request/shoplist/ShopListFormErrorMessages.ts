import {FormError} from "../FormError";
import {FormErrorMessages} from "../FormErrorMessages";

export class ShopListFormErrorMessages extends FormErrorMessages {

  private static readonly _messages: FormError[] = [
    ShopListFormErrorMessages.placeNull,
    ShopListFormErrorMessages.userNull
  ];


  get messages(): FormError[] {
    return ShopListFormErrorMessages._messages;
  }
}

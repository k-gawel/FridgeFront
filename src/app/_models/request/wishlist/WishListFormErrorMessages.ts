import {FormError} from "../FormError";
import {FormErrorMessages} from "../FormErrorMessages";
import {ErrorCode} from "../ErrorCode";

export class WishListFormErrorMessages extends FormErrorMessages {

  private static readonly _messages: FormError[] = [
    new FormError(ErrorCode.NAME.LENGTH, "Nazwa musi zawierać się w od 5 do 30 znaków", "Name must be between 5 and 30 characters"),
    WishListFormErrorMessages.placeNull,
    WishListFormErrorMessages.userNull
  ];


  get messages(): FormError[] {
    return WishListFormErrorMessages._messages;
  }
}

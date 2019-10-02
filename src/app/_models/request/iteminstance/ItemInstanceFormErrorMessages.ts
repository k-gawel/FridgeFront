import {FormError} from "../FormError";
import {FormErrorMessages} from "../FormErrorMessages";

export class ItemInstanceFormErrorMessages extends FormErrorMessages {

  private static readonly _messages: FormError[] = [
    ItemInstanceFormErrorMessages.userNull,
    ItemInstanceFormErrorMessages.itemNull,
    ItemInstanceFormErrorMessages.containerNull,
    new FormError("expireDate.past", "Data ważności nie może być przeszła", "Expire date must not be in past"),
    new FormError("price.negative", "Cena nie może być mniejsza od zera", "Price must not be negative")
  ];


  get messages(): FormError[] {
    return ItemInstanceFormErrorMessages._messages;
  }

}

import {FormError} from "../FormError";
import {FormErrorMessages} from "../FormErrorMessages";
import {ErrorCode} from "../ErrorCode";

export class ItemFormErrorMessages extends FormErrorMessages {

  private static readonly _messages: FormError[] = [
    new FormError(ErrorCode.NAME.LENGTH, "Nazwa musi mieć co najmniej 5 znaków", "Name must be at least 5 characters long"),
    new FormError(ErrorCode.PLACE.NULL, "Miejsce nie istnieje", "Place doesn't exissts"),
    new FormError(ErrorCode.CATEGORY.NULL, "Katetgoria nie istnieje", "Cattegory doesn't exists"),
    new FormError(ErrorCode.DESCRIPTION.LENGTH, "Opis musi zawierać od 5 do 1500 znaków", "Description must be between 5 and 1500 characters"),
    new FormError(ErrorCode.CAPACITY.FORMAT, "Zły format pojemnośc", "Wrong capacity format")
  ];

  get messages(): FormError[] {
    return ItemFormErrorMessages._messages;
  }

}

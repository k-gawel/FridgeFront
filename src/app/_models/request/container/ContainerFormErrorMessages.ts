import {FormError} from "../FormError";
import {FormErrorMessages} from "../FormErrorMessages";
import {ErrorCode} from "../ErrorCode";

export class ContainerFormErrorMessages extends FormErrorMessages {

  private static readonly _messages: FormError[] = [
    new FormError(ErrorCode.PLACE.NULL, "Miejsce nie istnieje", "Place doesn't exists"),
    new FormError(ErrorCode.NAME.LENGTH, "Nazwa musi mieć od 5 do 30 znaków", "Name must be between 5 and 30 characters")
  ];

  get messages(): FormError[] {
    return ContainerFormErrorMessages._messages;
  }

}

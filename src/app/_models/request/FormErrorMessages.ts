import {FormError} from "./FormError";
import {ErrorCode} from "./ErrorCode";

export abstract class FormErrorMessages {

  abstract get messages(): FormError[];

  protected set(code: string | FormError, pl?: string, eng?: string): FormErrorMessages {
    if (code instanceof FormError)
      this.messages.push(code);
    else
      this.messages.push(new FormError(code, pl, eng));
    return this;
  }

  public get(code: string): FormError {
    return this.messages.find(f => f.code === code);
  }


  protected static get placeNull(): FormError {
    return new FormError(ErrorCode.PLACE.NULL, "Miejsce nie istnieje", "Place doesn't exists");
  }

  protected static get userNull(): FormError {
    return new FormError(ErrorCode.USER.NULL, "Użytkownik nie istnieje", "User doesn't exists");
  }

  protected static get containerNull(): FormError {
    return new FormError(ErrorCode.CONTAINER.NULL, "Musisz wybrać półkę", "Container must not be null");
  }

  protected static get itemNull(): FormError {
    return new FormError(ErrorCode.ITEM.NULL, "Musisz wybrać przedmiot", "Item must not be null");
  }

}




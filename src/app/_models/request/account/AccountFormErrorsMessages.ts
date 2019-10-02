import {FormError} from "../FormError";
import {FormErrorMessages} from "../FormErrorMessages";
import {ErrorCode} from "../ErrorCode";

export class AccountFormErrorsMessages extends FormErrorMessages {

  private static readonly _messages: FormError[] = [
    new FormError(ErrorCode.NAME.LENGTH, "Nazwa musi zawierać się między 5 a 30 znaków", "Name must be between 5 and 30 characters"),
    new FormError(ErrorCode.NAME.BUSY, "Nazwa jest już zajęta", "Name is already in use"),
    new FormError(ErrorCode.EMAIL.FORMAT, "Niewłaściwy format e-mail", "Use valid e-mail"),
    new FormError(ErrorCode.EMAIL.BUSY, "E-mail jest zajęty", "E-mail is laready in use"),
    new FormError(ErrorCode.PASSWORD.LENGTH, "Hasło musi mięć więcej niż 6 znaków", "Password must be longer than 6 characters"),
    new FormError(ErrorCode.PASSWORD.MATCH, "Hasła muszą być takie same", "Passwords must be equal"),
  ];

  get messages(): FormError[] {
    return AccountFormErrorsMessages._messages;
  }

}

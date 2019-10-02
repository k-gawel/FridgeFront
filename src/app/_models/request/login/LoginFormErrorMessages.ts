import {FormError} from "../FormError";
import {FormErrorMessages} from "../FormErrorMessages";

export class LoginFormErrorMessages extends FormErrorMessages {

  private static readonly _messages: FormError[] = [
    new FormError("datas.wrong", "Nieprawidłowe dane logowania", "Wrong login data")
  ];


  get messages(): FormError[] {
    return LoginFormErrorMessages._messages;
  }
}

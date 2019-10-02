import {FormErrors} from "./FormError";
import {validate, ValidationError} from "class-validator";
import {FormErrorMessages} from "./FormErrorMessages";

export abstract class Form {

  abstract get errors(): FormErrors;
  abstract get messages(): FormErrorMessages;
  abstract restartErrors(): void;

  validate(): Promise<boolean> {
    this.restartErrors();

    let processError = (e: ValidationError) => {
      Object.values(e.constraints).forEach((m: string) => this.setError(m));
    };

    let processErrors = (e: ValidationError[]): boolean => {
      e.forEach(processError);
      return e.length == 0;
    };

    return validate(this).then(processErrors);
  }

  public setError(code: string) {
    this.errors.set(this.messages.get(code));
  }

  public setErrors(codes: string[]) {
    this.restartErrors();
    codes.forEach(c => this.setError(c));
  }

}

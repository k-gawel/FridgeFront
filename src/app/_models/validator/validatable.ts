import {ErrorMessage} from '../util/ErrorMessage';

export interface Validatable {

  errors: ErrorMessage;
  validate(): boolean;
  sendMessage(message: string);


}

import * as errormessages from '/src/assets/datas/errormessages.json';
import {HttpErrorResponse} from "@angular/common/http";
import {e} from "@angular/core/src/render3";

export class ErrorMessage extends Error {


  public messages: string[] = [];

  public putMessage(message: string) {
    this.messages.push(message);
  }

  constructor(error: string | HttpErrorResponse) {
    super(error instanceof  HttpErrorResponse ? <string> error.error.localizedMessage : error);
    this.messages.push(error instanceof  HttpErrorResponse ? <string> error.error.localizedMessage : error);
  }

}

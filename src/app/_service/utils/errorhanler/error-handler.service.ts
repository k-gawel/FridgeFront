import { Injectable } from '@angular/core';
import {ErrorMessage} from "../../../_models/util/ErrorMessage";
import {Subject} from "rxjs/Subject";

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor() { }

  public $errors: Subject<string[]> = new Subject<string[]>();


  public hasErrors: boolean = false;

  public sendErrors(errors: string[] | ErrorMessage | Error) {

    console.error(errors);

    this.hasErrors = true;

    if(errors instanceof Array)
      this.$errors.next(errors);
    if(errors instanceof ErrorMessage)
      this.$errors.next(errors.messages);
    if(errors instanceof Error) {
      let errorsArray: string[] = [];
      errorsArray.push(errors.message);
      this.$errors.next(errorsArray);
    }

  }

  public closeErrorsWindow() {
    this.hasErrors = false;
    this.$errors.next(null);
  }

}

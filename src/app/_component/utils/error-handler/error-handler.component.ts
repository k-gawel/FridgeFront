import { Component, OnInit } from '@angular/core';
import {ErrorHandlerService} from "../../../_service/utils/errorhanler/error-handler.service";
import {Subscriber} from "rxjs/Subscriber";
import {Subscription} from "rxjs/Subscription";
import {mixinErrorState} from "@angular/material";

@Component({
  selector: 'app-error-handler',
  templateUrl: './error-handler.component.html',
  styleUrls: ['./error-handler.component.css']
})
export class ErrorHandlerComponent implements OnInit {

  errors$: Subscription;
  errors: string[];

  constructor(public service: ErrorHandlerService) { }

  ngOnInit() {
    this.errors$ = this.service.$errors.subscribe(
      (errors: Object) => {
        if(errors == null)
          this.errors = null;
        if(errors instanceof Array)
          this.errors = errors;
      }
    );
  }

  ngOnDestroy() {
    this.errors$.unsubscribe();
  }

  close() {
    this.service.closeErrorsWindow();
  }

}

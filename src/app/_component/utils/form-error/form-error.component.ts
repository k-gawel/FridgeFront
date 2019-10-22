import {Component, Input, OnInit} from '@angular/core';
import {FormErrorLanguages, FormErrors} from "../../../_models/request/FormError";

@Component({
  selector: 'app-form-error',
  styles: [':host { color: red }'],
  template: `
    <span *ngFor="let message of messages">
      {{message}}
    </span>
  `
})
export class FormErrorComponent implements OnInit {

  @Input() field: string;
  @Input() errors: FormErrors;
  messages: string[];

  constructor() { }

  ngOnInit() {
    this.messages = this.errors.get(this.field).map(e => e.getMessage(FormErrorLanguages.PL));
    console.log("Errors", this.field, this.errors, this.messages)
  }

}

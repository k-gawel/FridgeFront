import {Component, Input, OnInit} from '@angular/core';
import {LocalDate} from "../../../../../../../../_util/date/JavaLocalDate";
import {KeyName} from "../../../../../../../../_models/response/KeyName";

@Component({
  selector: 'instance-action-info',
  template: `
    <button mat-raised-button class="instance-action-info-button">
      <span>
        <i [ngClass]="'fa fa-' + FAicon"></i>
      </span>

      <span>
        {{date.toSimpleString()}} by {{user.name}}
      </span>
    </button>
  `
})
export class InstanceActionInfoComponent implements OnInit {

  @Input() FAicon: string;
  @Input() date: LocalDate;
  @Input() user: KeyName;

  constructor() {
  }

  ngOnInit() {
  }

}

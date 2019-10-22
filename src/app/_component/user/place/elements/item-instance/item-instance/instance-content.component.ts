import {Component, Input} from "@angular/core";
import {ItemInstance} from "../../../../../../_models/response/item/ItemInstance";

@Component({
  selector: 'app-instance-content',
  styles: [':host { width: 100%}'],
  template: `
  <span mat-line class="three-column">

    <span>
      <i class="fas fa-calendar-plus"></i> {{instance.added.simpleDateString}}
    </span>

    <span>
      <i class="fas fa-user-plus"></i> {{instance.added.name}}
    </span>

    <span>
      <i class="fas fa-hourglass-end"></i> {{instance.expireOn.toSimpleString()}}
    </span>

  </span>

  <span mat-line class="space-between">

    <span>
      <i class="fas fa-comment-alt"></i> {{instance.comment}}
    </span>

    <span *ngIf="instance.price != null">
      {{instance.price.getAmount()}} {{instance.price.getCurrencyInfo().symbol_native}}
    </span>

  </span>
  `
})
export class InstanceContentComponent {

  @Input() instance: ItemInstance;

}

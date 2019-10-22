import {Component, Input} from "@angular/core";
import {WishListItem} from "../../../../../../_models/response/WishListItem";

@Component({
  selector: 'app-wish-list-item-content',
  template: `
    <app-wish-list-item-description [item]="item"></app-wish-list-item-description>
    <mat-divider></mat-divider>
    
    <app-instance-content *ngIf="item.addedInstance" [instance]="item.addedInstance">
    </app-instance-content>
  `
})
export class WishListItemContentComponent {

  @Input() item: WishListItem;

}

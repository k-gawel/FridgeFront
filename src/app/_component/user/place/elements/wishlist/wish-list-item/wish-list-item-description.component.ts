import {Component, Input} from "@angular/core";
import {WishListItem} from "../../../../../../_models/response/WishListItem";

@Component({
  selector: 'app-wish-list-item-description',
  template: `
    <div>

      <h4 class="space-between">
        <span>
          <i class="fa fa-user"></i> {{item.created.name}}
        </span>

        <span>
          <i class="fa fa-calendar"></i> {{item.created.simpleDateString}}
        </span>
      </h4>

      <h6 style="color: lightgrey">
        {{item.comment}}
      </h6>

    </div>
  `
})
export class WishListItemDescriptionComponent {

  @Input() item: WishListItem;

}

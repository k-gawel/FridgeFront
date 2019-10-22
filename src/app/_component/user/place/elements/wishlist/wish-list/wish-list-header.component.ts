import {Component, Input} from "@angular/core";
import {WishList} from "../../../../../../_models/response/WishList";
import {MatDialogRef} from "@angular/material";
import {WishListService} from "../../../../../../_service/user/wishlist/wishlist/wish-list.service";

@Component({
  selector: 'app-wish-list-header',
  styles: [],
  template: `
    <mat-toolbar color="primary">

      <mat-toolbar-row class="space-between">

        <span class="text-truncate">
          {{wishList.name}}
        </span>

        <span>
          <button mat-icon-button (click)="archive()" *ngIf="wishList.archived == null">
            <i class="fa fa-trash-alt"></i>
          </button>
    
          <close-dialog-button [dialogRef]="dialogRef"></close-dialog-button>
        </span>

      </mat-toolbar-row>

    </mat-toolbar>
  `
})
export class WishListHeaderComponent {

  @Input() wishList: WishList;
  @Input() dialogRef: MatDialogRef;

  constructor(private service: WishListService) {
  }

  archive() {
    this.service.archive(this.wishList).then(r => {
      if(r)
        this.dialogRef.close();
    });
  }

}

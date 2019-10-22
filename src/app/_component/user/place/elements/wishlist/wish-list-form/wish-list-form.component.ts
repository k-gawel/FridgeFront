import {Component, EventEmitter, Inject, Input, Output} from '@angular/core';
import {WishListForm} from '../../../../../../_models/request/wishlist/WishListForm';
import {Place} from '../../../../../../_models/response/Place';
import {WishListService} from '../../../../../../_service/user/wishlist/wishlist/wish-list.service';
import {SessionService} from "../../../../../../_service/auth/cookieDatas/cookie-datas.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {WishList} from "../../../../../../_models/response/WishList";


@Component({
  selector: 'app-wish-list-form',
  templateUrl: './wish-list-form.component.html',
  styleUrls: ['./wish-list-form.component.css']
})
export class WishListFormComponent {

  @Input() place: Place;
  @Output() result = new EventEmitter<WishList>();

  form: WishListForm;

  constructor(private wishListService: WishListService,
              private sessionService: SessionService) {
  }

  ngOnInit() {
    this.form = new WishListForm();
    this.form.place = this.place.id;
    this.form.author = this.sessionService.getUserId();
  }

  submit() {
    let processSubmit = (res: WishList) => {
      if(res != null)
        this.result.emit(res);
    };

    let processValidation = (res: boolean) => {
      if(res)
        this.wishListService.addNew(this.form).then(processSubmit);
    };

    this.form.validate().then(processValidation);
  }

}

export interface WishListFormData {
  place: Place
}

@Component({
  template: `
    <mat-toolbar class="dialog-full-screen-toolbar">

      <mat-toolbar-row>
        <span>Add new WishList</span>

        <close-dialog-button [dialogRef]="dialogRef"></close-dialog-button>
      </mat-toolbar-row>

    </mat-toolbar>
    
    <app-wish-list-form [place]="data.place" (result)="onResult($event)"></app-wish-list-form>
  `
})
export class WishListFormDialog {

  constructor(public dialogRef: MatDialogRef<WishListFormComponent>,
              @Inject(MAT_DIALOG_DATA) public data: WishListFormData) {
  }

  onResult(result: WishList): void {
    this.dialogRef.close(result);
  }

}

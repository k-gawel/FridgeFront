import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {ShopListForm} from "../../../../../../_models/request/shoplist/ShopListForm";
import {SessionService} from "../../../../../../_service/auth/cookieDatas/cookie-datas.service";
import {Place} from "../../../../../../_models/response/Place";
import {ShopListService} from "../../../../../../_service/user/shoplist/shop-list.service";
import {ShopList} from "../../../../../../_models/response/ShopList";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";


@Component({
  selector: 'app-shop-list-form',
  templateUrl: './shop-list-form.component.html',
  styleUrls: ['./shop-list-form.component.css']
})
export class ShopListFormComponent implements OnInit {

  @Input() place: Place;
  @Output() created = new EventEmitter<ShopList>();

  constructor(private sessionService: SessionService,
              private shopListService: ShopListService) { }

  form: ShopListForm = new ShopListForm();

  ngOnInit() {
    this.form = this.newForm();
  }

  send() {
    const processSuccess = (result: ShopList) => {
      if(result != null)
        this.created.emit(result);
    };

    let processValidation = (result: boolean) => {
      if(result)
        this.shopListService.create(this.form).then(processSuccess);
    };

    this.form.validate().then(processValidation);
  }

  private newForm(): ShopListForm {
    const form = new ShopListForm();
    form.author = this.sessionService.getUserId();
    form.place  = this.place.id;
    return form;
  }


}

export class ShopListFormDialogData {
  place: Place;
}

@Component({
  template: `
    <mat-toolbar class="dialog-full-screen-toolbar space-between">
      <span>Create shop list</span>
      <close-dialog-button [dialogRef]="dialogRef"></close-dialog-button>
    </mat-toolbar>
    
    <app-shop-list-form [place]="data.place" (created)="dialogRef.close($event)">
    </app-shop-list-form>
  `
})
export class ShopListFormDialog {

  constructor(public dialogRef: MatDialogRef<ShopListFormDialog>,
              @Inject(MAT_DIALOG_DATA) public data: ShopListFormDialogData) {
  }

}

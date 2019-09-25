import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {WishListForm} from '../../../../../../_models/request/WishListForm';
import {PlaceDetails} from '../../../../../../_models/response/PlaceDetails';
import {WishList} from '../../../../../../_models/response/WishList';
import {WishListService} from '../../../../../../_service/user/wishlist/wishlist/wish-list.service';
import {CookieDataService} from "../../../../../../_service/auth/cookieDatas/cookie-datas.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {NewItemDatas} from "../../item/new-item-form/new_item.component";

export interface WishListFormDatas {
  place: PlaceDetails
}

@Component({
  selector: 'app-wish-list-form',
  templateUrl: './wish-list-form.component.html',
  styleUrls: ['./wish-list-form.component.css']
})
export class WishListFormComponent {

  @Input() place: PlaceDetails;

  constructor(private wishListService: WishListService,
              public dialogRef: MatDialogRef<WishListFormComponent>,
              @Inject(MAT_DIALOG_DATA) public data: WishListFormDatas,
              private sessionService: CookieDataService) {

    this.place = data.place;
    this.form.placeId = this.place.id;
    this.form.authorId = sessionService.getUserId();
  }

  form: WishListForm = new WishListForm();


  submit() {
    if(this.form.validate())
      this.wishListService.addNew(this.form)
        .then(res => this.dialogRef.close(res))
        .catch(e => this.form.errors = e);
  }


}

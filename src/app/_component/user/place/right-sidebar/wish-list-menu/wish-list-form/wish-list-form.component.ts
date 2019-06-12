import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {WishListForm} from '../../../../../../_models/response/WishList';
import {PlaceDetails} from '../../../../../../_models/request/PlaceDetails';
import {WishList} from '../../../../../../_models/request/WishList';
import {WishListService} from '../../../../../../_service/user/place/wishlist/wishlist/wish-list.service';
import {ErrorMessage} from '../../../../../../_models/util/ErrorMessage';

@Component({
  selector: 'app-wish-list-form',
  templateUrl: './wish-list-form.component.html',
  styleUrls: ['./wish-list-form.component.css']
})
export class WishListFormComponent implements OnInit {

  @Input() place: PlaceDetails;

  @Output() newWishList = new EventEmitter<WishList>();

  constructor(private wishListService: WishListService) { }

  form: WishListForm = new WishListForm();

  ngOnInit() {
    console.debug("WishListFormComponent.ngOnInit() placeId:", this.place.id);
    this.form.place = this.place.id;
  }

  submit() {
    console.debug("WishListFormComponent.submit()", this.form);

    if(!this.form.validate())
      return;

    this.wishListService.addNew(this.form)
      .then( (res: WishList) => {
        this.newWishList.emit(res);
       } )
      .catch((e: ErrorMessage) => {
        this.form.errors = e;
      });

  }



}

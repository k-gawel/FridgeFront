import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {WishListForm} from '../../../../../../_models/request/WishList';
import {PlaceDetails} from '../../../../../../_models/response/PlaceDetails';
import {WishList} from '../../../../../../_models/response/WishList';
import {WishListService} from '../../../../../../_service/user/place/wishlist/wishlist/wish-list.service';
import {CookieDataService} from "../../../../../../_service/auth/cookieDatas/cookie-datas.service";

@Component({
  selector: 'app-wish-list-form',
  templateUrl: './wish-list-form.component.html',
  styleUrls: ['./wish-list-form.component.css']
})
export class WishListFormComponent implements OnInit {

  @Input() place: PlaceDetails;

  @Output() newWishList = new EventEmitter<WishList>();

  constructor(private wishListService: WishListService,
              private sessionService: CookieDataService) { }

  form: WishListForm = new WishListForm();

  ngOnInit() {
    this.form.place = this.place.id;
    this.form.author = this.sessionService.getUserId();
  }

  submit() {
    if(this.form.validate())
      this.wishListService.addNew(this.form)
        .then( res => this.newWishList.emit(res) )
        .catch(e => this.form.errors = e);
  }


}

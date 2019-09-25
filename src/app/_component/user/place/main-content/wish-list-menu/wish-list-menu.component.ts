import {Component, EventEmitter, Input, Output} from '@angular/core';
import {PlaceDetails} from '../../../../../_models/response/PlaceDetails';
import {WishListService} from '../../../../../_service/user/wishlist/wishlist/wish-list.service';
import {KeyName} from '../../../../../_models/response/KeyName';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {WishList, WishListList} from '../../../../../_models/response/WishList';
import {Entity} from '../../../../../_models/response/Entity';
import {CookieDataService} from '../../../../../_service/auth/cookieDatas/cookie-datas.service';
import {DialogService} from "../../../../../_service/utils/dialog.service";
import {MatDialog} from "@angular/material";
import {PlaceService} from "../../../../../_service/user/place/place/place.service";

@Component({
  selector: 'app-wish-list-menu',
  templateUrl: './wish-list-menu.component.html',
  styleUrls: ['./wish-list-menu.component.css']
})
export class WishListMenuComponent {

  constructor(private wishListService: WishListService,
              private modalService: NgbModal,
              private placeService: PlaceService,
              private cookiesData: CookieDataService,
              private dialog: MatDialog) {
  }


  @Input() list: WishListList;
  @Input() place: PlaceDetails;

  _selectedWishList: WishList = null;
  @Output() selectedWishList = new EventEmitter<KeyName>();


  openForm() {
    const formDatas = {
      place: this.place
    };

    const dialogRef = DialogService.createWishListForm(this.dialog, formDatas);
  }


  select(wishList: WishList) {
    const datas = {
      wishList: wishList
    };

    const dialogRef = DialogService.createWishListComponent(this.dialog, datas);
  }


  deleteWishList(list: Entity | number) {
    let element: Entity;

    if(typeof list =='number') {
      element = new KeyName();
      element.id = list;
    }
    else
      element = list;
  }


}

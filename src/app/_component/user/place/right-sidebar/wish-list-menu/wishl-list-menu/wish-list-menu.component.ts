import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PlaceDetails} from '../../../../../../_models/response/PlaceDetails';
import {WishListService} from '../../../../../../_service/user/place/wishlist/wishlist/wish-list.service';
import {KeyName} from '../../../../../../_models/response/KeyName';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {WishListFormComponent} from '../wish-list-form/wish-list-form.component';
import {WishList} from '../../../../../../_models/response/WishList';
import {PlaceService} from '../../../../../../_service/user/place/place/place.service';
import {Entity} from '../../../../../../_models/response/Entity';
import {CookieDataService} from '../../../../../../_service/auth/cookieDatas/cookie-datas.service';
import {ErrorHandlerService} from '../../../../../../_service/utils/errorhanler/error-handler.service';

@Component({
  selector: 'app-wish-list-menu',
  templateUrl: './wish-list-menu.component.html',
  styleUrls: ['./wish-list-menu.component.css']
})
export class WishListMenuComponent implements OnInit {

  constructor(private wishListService: WishListService,
              private modalService: NgbModal,
              private placeService: PlaceService,
              private cookiesData: CookieDataService,
              private errorHandler: ErrorHandlerService) {
  }


  list: WishList[] = [];

  _place: PlaceDetails;
  @Input() set place(place: PlaceDetails) {
    this._place = place;
    this.list   = place.wishLists;
  }


  _selectedWishList: WishList = null;
  @Output() selectedWishList = new EventEmitter<KeyName>();


  ngOnInit() {

  }


  isAdmin(): boolean {
    return this._place.adminId === this.cookiesData.getUserId();
  }


  openForm() {
    const modalRef = this.modalService.open(WishListFormComponent);
    modalRef.componentInstance.place = this._place;
    modalRef.componentInstance.newWishList.subscribe((res: WishList) => {
        this.list.push(res);
        this.selectedWishList.emit(res);
        modalRef.close();
      });
  }


  select(wishList: WishList) {
    this.selectedWishList.emit(wishList);
    this._selectedWishList = wishList;
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

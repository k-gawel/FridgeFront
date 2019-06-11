import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PlaceDetails} from '../../../../../../_models/request/PlaceDetails';
import {WishListService} from '../../../../../../_service/user/place/wishlist/wishlist/wish-list.service';
import {KeyName} from '../../../../../../_models/request/KeyName';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {WishListFormComponent} from '../wish-list-form/wish-list-form.component';
import {WishList} from '../../../../../../_models/request/WishList';
import {PlaceService} from '../../../../../../_service/user/place/place/place.service';
import {Entity} from '../../../../../../_models/request/Entity';
import {CookieDataService} from "../../../../../../_service/auth/cookieDatas/cookie-datas.service";
import {ErrorMessage} from "../../../../../../_models/util/ErrorMessage";
import {ErrorHandlerService} from "../../../../../../_service/utils/errorhanler/error-handler.service";

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
              private errorHandler: ErrorHandlerService) { }


  list: WishList[] = [];

  _place: PlaceDetails;
  @Input() set place(place: PlaceDetails) {
    console.log("WishListMenuComponent.setPlace()", place);
    this._place = place;

    this.wishListService.getByPlace(this._place.id)
      .then( (res: WishList[]) => {
        if(res == null) return;
        this.list = res;
      })
      .catch( (e: ErrorMessage) => {
        this.errorHandler.sendErrors(e);
      });

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
    modalRef.componentInstance.placeId = this._place;
    modalRef.componentInstance.newWishList
      .subscribe((res: WishList) => {
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

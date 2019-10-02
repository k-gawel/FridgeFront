import {Component, EventEmitter, Input, Output} from '@angular/core';
import {PlaceDetails} from '../../../../_models/response/PlaceDetails';
import {CookieDataService} from '../../../../_service/auth/cookieDatas/cookie-datas.service';
import {ContainersList} from '../../../../_models/response/Container';
import {KeyName} from '../../../../_models/response/KeyName';
import {PlaceService} from '../../../../_service/user/place/place/place.service';
import {IdSelector} from '../../../../_service/utils/EntitySelector';
import {ErrorMessage} from '../../../../_models/util/ErrorMessage';
import {ErrorHandlerService} from '../../../../_service/utils/errorhanler/error-handler.service';
import {Category} from '../../../../_models/response/Category';
import {WishList} from '../../../../_models/response/WishList';
import {PlaceContent} from '../../../../_models/util/Content';
import {PlaceUserService} from '../../../../_service/user/place/placeUser/place-user.service';

@Component({
  selector: 'app-place',
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.css']
})
export class PlaceComponent  {

  @Input()
  set place(value: KeyName) {
    this.placeService.getById(new IdSelector(value))
      .then((result: PlaceDetails) => this._place = result )
      .catch(e => console.log(e));
  }

  _place: PlaceDetails;
  _chosenContainers: ContainersList;

  content: PlaceContent = PlaceContent.ITEMS;
  contentParams: any;


  constructor(private cookieData: CookieDataService,
              private placeService: PlaceService,
              private placeUserService: PlaceUserService,
              private errorHandler: ErrorHandlerService) {
  }


  isAdmin(): boolean {
    return this.cookieData.getUserId() === this._place.adminId;
  }


  setChosenContainers(containers: ContainersList) {
    this._chosenContainers = containers;
  }


  setWishList(wishList: WishList) {
    this.contentParams = wishList;
    this.content = PlaceContent.WISHLIST;
  }


  setItems() {
    this.contentParams = null;
    this.content = PlaceContent.ITEMS;
  }


  @Output() leavedPlace = new EventEmitter<PlaceDetails>();


  canLeavePlace(): boolean {
    return !this.isAdmin() || this._place.users.filter(u => u.status).size() === 1
  }


  leavePlace() {
    if (!this.canLeavePlace()) {
      this.errorHandler.sendErrors(["You can't leave this placeId without an admin. Try to promote someone."]);
      return;
    }

    this.placeUserService.removeUser(this._place, this.cookieData.getUserId())
      .then(() => this.leavedPlace.emit(this._place) )
      .catch((e: ErrorMessage) => this.errorHandler.sendErrors(e));
  }

}

import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Place} from '../../../../_models/response/Place';
import {SessionService} from '../../../../_service/auth/cookieDatas/cookie-datas.service';
import {ContainersList} from '../../../../_models/response/Container';
import {KeyName} from '../../../../_models/response/KeyName';
import {PlaceService} from '../../../../_service/user/place/place/place.service';
import {IdSelector} from '../../../../_service/utils/EntitySelector';
import {ErrorMessage} from '../../../../_models/util/ErrorMessage';
import {ErrorHandlerService} from '../../../../_service/utils/errorhanler/error-handler.service';
import {WishList} from '../../../../_models/response/WishList';
import {PlaceContent} from '../../../../_models/util/Content';
import {PlaceUserService} from '../../../../_service/user/place/placeUser/place-user.service';

@Component({
  selector: 'app-place',
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.css']
})
export class PlaceComponent  {

  _place: Place;
  _chosenContainers: ContainersList;

  content: PlaceContent = PlaceContent.ITEMS;
  contentParams: any;


  constructor(private cookieData: SessionService,
              private placeService: PlaceService,
              private placeUserService: PlaceUserService,
              private errorHandler: ErrorHandlerService) {
  }

  @Input()
  set place(value: KeyName) {
    this.placeService.getById(new IdSelector(value))
      .then((result: Place) => this._place = result )
      .catch(e => console.log(e));
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


  @Output() leavedPlace = new EventEmitter<Place>();


  canLeavePlace(): boolean {
    return !this.isAdmin() || this._place.users.filter(u => u.status).size() === 1
  }


  leavePlace() {
    if (!this.canLeavePlace()) {
      this.errorHandler.sendErrors(["You can't leave this place without an admin. Try to promote someone."]);
      return;
    }
    let user = this._place.users[this.cookieData.getUserId()];
    this.placeUserService.removeUser(this._place, user)
                         .then(() => this.leavedPlace.emit(this._place) )
                         .catch((e: ErrorMessage) => this.errorHandler.sendErrors(e));
  }

}

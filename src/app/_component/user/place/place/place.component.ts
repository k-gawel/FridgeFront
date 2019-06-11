import {Component, EventEmitter, Inject, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {PlaceDetails} from "../../../../_models/request/PlaceDetails";
import {CookieDataService} from "../../../../_service/auth/cookieDatas/cookie-datas.service";
import {ContainersList} from "../../../../_models/request/Container";
import {KeyName} from "../../../../_models/request/KeyName";
import {PlaceService} from "../../../../_service/user/place/place/place.service";
import {IdSelector} from "../../../../_service/utils/EntitySelector";
import {ErrorMessage} from "../../../../_models/util/ErrorMessage";
import {ErrorHandlerService} from "../../../../_service/utils/errorhanler/error-handler.service";
import {Category} from "../../../../_models/request/Category";
import {WishList} from "../../../../_models/request/WishList";
import {PlaceContent} from "../../../../_models/util/Content";

@Component({
  selector: 'app-place',
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.css']
})
export class PlaceComponent implements OnInit, OnDestroy {

  @Input()
  set place(value: KeyName) {
    this.placeService.getById(new IdSelector(value))
      .then( (result: PlaceDetails) => {
        this._place = result;
      } )
      .catch( (e: ErrorMessage) => {
        this.errorHandler.sendErrors(e);
      })
  }

  _place: PlaceDetails;
  _chosenContainers: ContainersList;
  _chosenCategory: Category;

  content: PlaceContent = PlaceContent.ITEMS;
  contentParams: any;


  constructor(private cookieData: CookieDataService,
              private placeService: PlaceService,
              private errorHandler: ErrorHandlerService) {
  }

  ngOnInit(): void {
  }


  ngOnDestroy(): void {
  }


  isAdmin(): boolean {
    return this.cookieData.getUserId() === this._place.adminId;
  }


  setChosenContainers(containers: ContainersList) {
    this._chosenContainers = containers;
  }


  setChosenCategory(category: Category) {
    console.debug("PlaceComponent.setChosenCategory()", category);
    this._chosenCategory = category;
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
  leavePlace() {
    if(this.isAdmin() && this._place.users.size() > 1) {
      this.errorHandler.sendErrors(["You can't leave this placeId without an admin. Try to promote someone."]);
      return;
    }

    let keyName = new KeyName();
    keyName.id = this.cookieData.getUserId();
    this.placeService.removeUser(this._place, keyName)
      .then((res: boolean) => {
        if(!res)
          this.errorHandler.sendErrors(["Couldn't remove you from this placeId..."]);
        else
          this.leavedPlace.emit(this._place);
      })
      .catch((e: ErrorMessage) => this.errorHandler.sendErrors(e));
  }


}

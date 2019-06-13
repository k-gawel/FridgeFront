import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {UserContent} from '../../../../_models/util/Content';
import {AccountDatas} from '../../../../_models/request/AccountDatas';
import {KeyName} from '../../../../_models/request/KeyName';
import {PlaceDetails} from '../../../../_models/request/PlaceDetails';
import {CookieDataService} from '../../../../_service/auth/cookieDatas/cookie-datas.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {

  @Input()
  set accountDatas(value: AccountDatas) {
    this._accountDatas = value;
  }

  isCollapsed: boolean = false;


  _userContent: UserContent;
  _contentParams: any;
  _accountDatas: AccountDatas;



  constructor(private cookieDatas: CookieDataService) {
  }


  ngOnDestroy(): void {
  }


  ngOnInit(): void {
  }


  setPlace(place: KeyName) {
    if(this._contentParams == place)
      return;
    this._contentParams = place;
    this._userContent = UserContent.PLACE;
  }


  setAccountManagement() {
    this._contentParams = null;
    this._userContent = UserContent.ACCOUNT;
  }


  removedPlace: PlaceDetails;
  removePlace(place: PlaceDetails) {
    this._contentParams = null;
    this._userContent = UserContent.HOME;
    this.removedPlace = place;
  }


  logout() {
    this.cookieDatas.deleteToken();
    this.cookieDatas.deleteUserId();
    window.location.reload();
  }

}

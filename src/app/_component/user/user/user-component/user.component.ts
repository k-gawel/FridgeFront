import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {UserContent} from '../../../../_models/util/Content';
import {AccountDatas} from '../../../../_models/response/AccountDatas';
import {KeyName} from '../../../../_models/response/KeyName';
import {Place} from '../../../../_models/response/Place';
import {SessionService} from '../../../../_service/auth/cookieDatas/cookie-datas.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {

  console = console;

  @Input()
  set accountDatas(value: AccountDatas) {
    this._accountDatas = value;
  }

  _userContent: UserContent;
  _contentParams: any;
  _accountDatas: AccountDatas;

  constructor(private cookieDatas: SessionService) {
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


  removedPlace: Place;
  removePlace(place: Place) {
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

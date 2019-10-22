import {Component, Input, OnInit} from '@angular/core';
import {Place} from '../../../../../_models/response/Place';
import {SessionService} from '../../../../../_service/auth/cookieDatas/cookie-datas.service';
import {KeyName, KeyNameList} from '../../../../../_models/response/KeyName';
import {PlaceService} from '../../../../../_service/user/place/place/place.service';
import {ErrorHandlerService} from '../../../../../_service/utils/errorhanler/error-handler.service';
import {AccountService} from '../../../../../_service/user/user/account.service';
import {PlaceUserService} from '../../../../../_service/user/place/placeUser/place-user.service';
import {PlaceUser} from '../../../../../_models/response/place-user/PlaceUser';

@Component({
  selector: 'app-users-menu',
  templateUrl: './users-menu.component.html',
  styleUrls: ['./users-menu.component.css']
})
export class UsersMenuComponent implements OnInit {


  @Input() place: Place;


  form: KeyName;
  usersList: KeyNameList<KeyName> = new KeyNameList<KeyName>();


  constructor(private userService: AccountService,
              private cookieDatas: SessionService,
              private placeService: PlaceService,
              private errorHandler: ErrorHandlerService,
              private placeUserService: PlaceUserService) {
  }

  ngOnInit() {
  }

  searchByName(name: string) {
    this.form = null;
    if (name == null)
      return;
    if (name.length < 4)
      this.usersList = new KeyNameList<KeyName>();
    else
      this.userService.searchByName(name).then(l => this.usersList = l);
  }


  addUser() {
    let processResult = () => {
      this.form = null;
      this.usersList = new KeyNameList<KeyName>();
    };

    this.placeUserService.addUser(this.place, this.form)
                         .then( processResult);
  }



  isAdmin(user?: KeyName): boolean {
    if (user == undefined)
      return this.cookieDatas.getUserId() === this.place.adminId;
    else
      return user.id === this.place.adminId;
  }

  canTakeAnyActions(user: PlaceUser): boolean {
    return this.canPromoteUser(user) || this.canRemoveUser(user);
  }

  canRemoveUser(user: PlaceUser): boolean {
    return user != null && user.status && !this.isAdmin(user) && this.isAdmin();
  }

  removeUser(user: PlaceUser) {
    this.placeUserService.removeUser(this.place, user);
  }

  canPromoteUser(user: PlaceUser): boolean {
    return !this.isAdmin(user) && this.isAdmin();
  }

  promoteUser(user: PlaceUser) {
    this.placeUserService.changeAdmin(this.place, user);
  }


}

@Component({
  selector: 'user-menu-stat',
  template: `
    <button mat-menu-item class="space-between" (click)="$event.stopPropagation()">
      <span> {{label}} </span>
      <strong> {{number}} </strong>
    </button>
  `
})
export class UserStatComponent {

  @Input() label: string;
  @Input() number: number;

}

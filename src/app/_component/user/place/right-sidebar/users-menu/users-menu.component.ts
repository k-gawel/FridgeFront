import {Component, Input, OnInit} from '@angular/core';
import {PlaceDetails} from '../../../../../_models/response/PlaceDetails';
import {PlaceUsersList} from '../../../../../_models/response/place-user/PlaceUsersList';
import {CookieDataService} from '../../../../../_service/auth/cookieDatas/cookie-datas.service';
import {KeyName, KeyNameList} from '../../../../../_models/response/KeyName';
import {PlaceService} from '../../../../../_service/user/place/place/place.service';
import {ErrorHandlerService} from '../../../../../_service/utils/errorhanler/error-handler.service';
import {AccountService} from '../../../../../_service/user/user/account.service';
import {PlaceUserService} from '../../../../../_service/user/place/placeUser/place-user.service';
import {PlaceUser} from '../../../../../_models/response/place-user/PlaceUser';
import {FormControl} from "@angular/forms";
import {BehaviorSubject, Observable} from "rxjs";
import {startWith} from "rxjs-compat/operator/startWith";
import {map} from "rxjs/operators";


@Component({
  selector: 'app-users-menu',
  templateUrl: './users-menu.component.html',
  styleUrls: ['./users-menu.component.css']
})
export class UsersMenuComponent implements OnInit {


  @Input() place: PlaceDetails;
  users: PlaceUsersList = new PlaceUsersList();

  formCtrl = new FormControl();

  form: KeyName = new KeyName();
  usersList: KeyNameList<KeyName> = new KeyNameList<KeyName>();


  constructor(private userService: AccountService,
              private cookieDatas: CookieDataService,
              private placeService: PlaceService,
              private errorHandler: ErrorHandlerService,
              private placeUserService: PlaceUserService) {
    this.formCtrl.valueChanges.subscribe(e => this.searchByName(e));
  }

  ngOnInit() {
    this.users = this.place.users;
  }

  searchByName(name: string) {
    if (name == null)
      return;
    if (name.length < 4)
      this.usersList = new KeyNameList<KeyName>();
    else
      this.userService.searchByName(name).then(l => this.usersList = l);
  }


  selectUserToAdd(user: KeyName) {
    this.form = user;
  }


  addUser() {
    this.placeUserService.addUser(this.place, this.form)
      .catch( e => this.errorHandler.sendErrors(e) )
      .then( () => this.form = new KeyName() );
  }


  private pushUser(u: KeyName) {
    let user = PlaceUser.clone(u);
    this.users.add(user);
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

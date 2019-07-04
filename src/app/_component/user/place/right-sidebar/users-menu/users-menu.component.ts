import {Component, Input, OnInit} from '@angular/core';
import {PlaceDetails} from '../../../../../_models/response/PlaceDetails';
import {PlaceUsersList} from '../../../../../_models/response/place-user/PlaceUsersList';
import {CookieDataService} from '../../../../../_service/auth/cookieDatas/cookie-datas.service';
import {KeyName, KeyNameList} from '../../../../../_models/response/KeyName';
import {PlaceService} from '../../../../../_service/user/place/place/place.service';
import {ErrorHandlerService} from '../../../../../_service/utils/errorhanler/error-handler.service';
import {ErrorMessage} from '../../../../../_models/util/ErrorMessage';
import {AccountService} from '../../../../../_service/user/user/account.service';
import {PlaceUserService} from '../../../../../_service/user/place/placeUser/place-user.service';
import {PlaceUser} from '../../../../../_models/response/place-user/PlaceUser';


@Component({
  selector: 'app-users-menu',
  templateUrl: './users-menu.component.html',
  styleUrls: ['./users-menu.component.css']
})
export class UsersMenuComponent implements OnInit {


  _place: PlaceDetails;
  _users: PlaceUsersList;
  form: KeyName = new KeyName();
  usersList: KeyNameList = new KeyNameList();


  constructor(private userService: AccountService,
              private cookieDatas: CookieDataService,
              private placeService: PlaceService,
              private errorHandler: ErrorHandlerService,
              private placeUserService: PlaceUserService) {
    this.form.name = '';
  }


  ngOnInit() {}


  @Input() set place(value: PlaceDetails) {
    this._place = value;
    this._users = this._place.users;
  }


  onFormNameChange() {
    if(this.form.name.length < 4)
      return;

    this.form.id = null;
    this.userService.searchByName(this.form.name)
      .then(res=> this.usersList = res )
      .catch(e => this.errorHandler.sendErrors(e) );
  }


  selectUserToAdd(user: KeyName) {
    this.form = user;
  }


  isAdmin(user?: KeyName): boolean {
    if(user == undefined)
      return this.cookieDatas.getUserId() === this._place.adminId;
    else
      return user.id === this._place.adminId;
  }


  addUser() {
    this.placeUserService.addUser(this._place, this.form)
      .catch( e => this.errorHandler.sendErrors(e) )
      .then( () => this.form = new KeyName() );
  }


  private pushUser(u: KeyName) {
    let user = PlaceUser.clone(u);
    this._users.push(user);
  }

  canRemoveUser(user: PlaceUser): boolean {
    return user != null && user.status && !this.isAdmin(user) && this.isAdmin();
  }

  removeUser(user: PlaceUser) {
    if(!this.canRemoveUser(user))
      this.errorHandler.sendErrors(["Can not remove user"]);

    this.placeUserService.removeUser(this._place, user)
      .catch((e: ErrorMessage) => this.errorHandler.sendErrors(e) );
  }


  promoteUser(user: PlaceUser) {
    if (this.isAdmin(user) || !this.isAdmin())
      this.errorHandler.sendErrors(["You can't promote this user!"]);
    else
      this.placeUserService.changeAdmin(this._place, user)
        .catch((e: ErrorMessage) => this.errorHandler.sendErrors(e));
  }



}

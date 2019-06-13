import {Component, Input, OnInit} from '@angular/core';
import {PlaceDetails} from '../../../../../_models/request/PlaceDetails';
import {PlaceUsersList} from '../../../../../_models/request/place-user/PlaceUsersList';
import {CookieDataService} from '../../../../../_service/auth/cookieDatas/cookie-datas.service';
import {KeyName, KeyNameList} from '../../../../../_models/request/KeyName';
import {PlaceService} from '../../../../../_service/user/place/place/place.service';
import {ErrorHandlerService} from '../../../../../_service/utils/errorhanler/error-handler.service';
import {ErrorMessage} from '../../../../../_models/util/ErrorMessage';
import {UserService} from '../../../../../_service/user/user/user.service';
import {PlaceUserStats, PlaceUserStatsList} from '../../../../../_models/request/place/place-user-stats';
import {PlaceUserService} from '../../../../../_service/user/place/placeUser/place-user.service';
import {PlaceUser} from '../../../../../_models/request/place-user/PlaceUser';
import {Size, WindowServiceService} from '../../../../../_service/utils/window-service.service';


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
  usersStats: PlaceUserStatsList;

  isCollapsed: boolean;

  constructor(private userService: UserService,
              private cookieDatas: CookieDataService,
              private placeService: PlaceService,
              private errorHandler: ErrorHandlerService,
              private placeUserService: PlaceUserService,
              private windowService: WindowServiceService) {
    this.form.name = '';
    windowService.$resize.subscribe(s => {
      console.log("RESIZED ", s);
      this.isCollapsed = s <= Size.SM;
    })
  }


  ngOnInit() {}


  @Input() set place(value: PlaceDetails) {
    console.debug("UsersMenuComponent.setPlace()", value);
    this._place = value;
    this._users = this._place.users;

    this.placeUserService.getPlaceStats(this._place)
      .then((res: PlaceUserStatsList) => {
        console.debug("UsersMenuComponent.getPlaceStats()", res);
        this.usersStats = res;
      })
      .catch((e: ErrorMessage) => this.errorHandler.sendErrors(e));
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
    this.placeService.addUser(this._place, this.form)
      .then((res: boolean) => {
        if (res)
          this.pushUser(this.form);
        else
          this.errorHandler.sendErrors(['Couldn\'t add this user to placeId']);
      })
      .catch( e => this.errorHandler.sendErrors(e) )
      .then( () => this.form = new KeyName() );
  }


  private pushUser(u: KeyName) {
    let user = PlaceUser.clone(u);
    this._users.push(user);

    if(this.usersStats.getById(user.id) == null)
      this.usersStats.push(PlaceUserStats.create(user.id));
  }

  removeUser(user: PlaceUser) {

    if(user == null || !user.status || this.isAdmin(user) || !this.isAdmin()) {
      this.errorHandler.sendErrors(["You can't delete this user!",
        user == null ? "User is null" : null,
        !user.status ? "User is already deleted." : null,
        this.isAdmin(user) ? "User is an admin" : null,
        !this.isAdmin() ? "You are not and admin..." : null]);
      return;
    }

    this.placeService.removeUser(this._place, user)
      .then((res: boolean) => {
        if(res) {
          this._users.remove(user);
        } else {
          this.errorHandler.sendErrors(["You can't delete this user"]);
        }
      })
      .catch((e: ErrorMessage) => {
        this.errorHandler.sendErrors(e);
      })
  }


  promoteUser(user: PlaceUser) {
    if (this.isAdmin(user) || !this.isAdmin()) {
      this.errorHandler.sendErrors(["You can't promote this user!"]);
      return;
    }

    this.placeService.changeAdmin(this._place, user)
      .then((res: boolean) =>{
        if(!res)
          this.errorHandler.sendErrors(["Couldn't promote this user"]);
      })
      .catch((e: ErrorMessage) => {
        this.errorHandler.sendErrors(e);
      })
  }



}

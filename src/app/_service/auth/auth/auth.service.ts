import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {RoleContent} from '../../../_models/util/Content';
import {AuthorizationApiService} from '../../api/account/authorization-api.service';
import {LoginForm} from '../../../_models/request/login/LoginForm';
import {AccountForm} from '../../../_models/request/account/AccountForm';
import {AccountApiService} from '../../api/account/account-api.service';
import {ErrorMessage} from '../../../_models/util/ErrorMessage';
import {AccountDatas} from '../../../_models/response/AccountDatas';
import {CookieDataService} from '../cookieDatas/cookie-datas.service';
import {Producer} from '../../../_models/response/item/Producer';
import {Category} from '../../../_models/response/Category';
import {HttpErrorResponse} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public $roleContent = new BehaviorSubject<RoleContent>(RoleContent.GUEST);

  constructor(private accountApi: AccountApiService,
              private authApi: AuthorizationApiService,
              private cookiesData: CookieDataService) {
  }

  public register(form: AccountForm) {
    return this.accountApi.newAccount(form)
      .then((r: string) => this.cookiesData.setToken(r) )
      .catch((error: ErrorMessage) => error);
  }


  public login(form?: LoginForm): Promise<AccountDatas> {
    let initialResponse = form != undefined ?
      this.authApi.loginWithForm(form.name, form.password) : this.authApi.loginWithToken();


    return initialResponse.then((r: JSON) => {
      this.processInitialResponse(r);
      return new AccountDatas(r);
    }).catch((e: HttpErrorResponse) => {
      if(form == undefined)
        return null;
      else
        throw e;
    });
  }


  public logout(): Promise<Boolean> {
    return null;
  }


  private processInitialResponse(json: JSON): void {
    if(json == null) return;

    this.cookiesData.setUserId(json['id']);
    this.cookiesData.setToken(json['token']);

    (<JSON[]> json['producers']).forEach(j => new Producer(j));
    Category.rootCategory = new Category(json['root_category']);
  }


}

import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {RoleContent} from '../../../_models/util/Content';
import {AuthorizationApiService} from '../../api/account/authorization-api.service';
import {LoginForm} from '../../../_models/response/LoginForm';
import {AccountForm} from '../../../_models/response/AccountForm';
import {AccountApiService} from '../../api/account/account-api.service';
import {ErrorMessage} from '../../../_models/util/ErrorMessage';
import {AccountDatas} from '../../../_models/request/AccountDatas';
import {HttpErrorResponse} from '@angular/common/http';
import {CookieDataService} from '../cookieDatas/cookie-datas.service';
import {CategoriesServiceService} from '../../utils/categories-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public $roleContent = new BehaviorSubject<RoleContent>(RoleContent.GUEST);

  constructor(private accountApi: AccountApiService,
              private authApi: AuthorizationApiService,
              private cookiesData: CookieDataService,
              private categoryService: CategoriesServiceService) {
  }

  public async register(form: AccountForm): Promise<Boolean> {

    if(!form.validate())
      throw form.errors;

    let result: boolean;

    await this.accountApi.newAccount(form)
      .then((response: Boolean) => {
        if(response)
          result = true;
        else
          throw new ErrorMessage("accountcreate.unable");
      } )
      .catch((error: ErrorMessage) => {
        throw error;
      } );

    return result;
  }


  public async login(form?: LoginForm): Promise<AccountDatas> {
    let result: AccountDatas;
    let errorResult: ErrorMessage;

    if(form != undefined)
      await this.loginWithForm(form)
        .then((response: AccountDatas) => {
          result = response;
        } )
        .catch((error: ErrorMessage) => errorResult = error );
    else
      await this.loginByToken()
        .then((response: AccountDatas) => result = response )
        .catch((error: ErrorMessage) => errorResult = error );

    if(errorResult != null)
      throw errorResult;

    if(result != null) {
      this.cookiesData.setUserId(result.id);
      this.cookiesData.setToken(result.token);
    }

    return result;
  }


  public logout(): Promise<Boolean> {
    return null;
  }


  private loginWithForm(form: LoginForm): Promise<AccountDatas> {
    if(!form.validate())
      throw form.errors;

    return this.authApi.loginWithForm(form.name, form.password)
      .then((response: JSON) => {
        let result = new AccountDatas(response);
        return result;
      } )
      .catch((error: HttpErrorResponse) => {
        throw new ErrorMessage(error);
      } );
  }


  private loginByToken(): Promise<AccountDatas> {
    return this.authApi.loginWithToken()
      .then((response: JSON) => {
        return new AccountDatas(response);
      } )
      .catch((error: HttpErrorResponse) => {
        return null;
      } );
  }


}

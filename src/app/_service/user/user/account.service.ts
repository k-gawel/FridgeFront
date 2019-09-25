import {Injectable} from '@angular/core';
import {AccountApiService} from '../../api/account/account-api.service';
import {PlaceUsersList} from '../../../_models/response/place-user/PlaceUsersList';
import {KeyName, KeyNameList} from '../../../_models/response/KeyName';
import {ErrorMessage} from '../../../_models/util/ErrorMessage';
import {HttpErrorResponse} from '@angular/common/http';
import {AccountForm} from '../../../_models/request/AccountForm';

@Injectable({
  providedIn: 'root'
})
export class AccountService {


  constructor(private api: AccountApiService) {
  }


  public getUser(id: number, refresh?: boolean): Promise<KeyName> {
    let result;

    if(refresh == undefined || refresh == false) {
      result = PlaceUsersList.ALL[id];
      if(result != undefined)
        return result;
    }
  }


  public searchByName(name: string): Promise<KeyNameList> {

    return this.api.searchByName(name)
      .then((res: JSON[]) => {
        if(res == null)
          throw new ErrorMessage("Res is null");
        return new KeyNameList(res);
      })
      .catch((e: HttpErrorResponse) => {
        throw new ErrorMessage(e.message);
      })

  }


  public updateAccount(password: string, form: AccountForm) {
    return this.api.changeAccountDetails(password, form)
      .then(r => {

      })
  }


}

import {Injectable} from '@angular/core';
import {AccountApiService} from '../../api/account/account-api.service';
import {PlaceUsersList} from '../../../_models/request/place-user/PlaceUsersList';
import {KeyName, KeyNameList} from '../../../_models/request/KeyName';
import {ErrorMessage} from '../../../_models/util/ErrorMessage';
import {HttpErrorResponse} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(private api: AccountApiService) {
  }



  public getUser(id: number, refresh?: boolean): Promise<KeyName> {

    let result;

    if(refresh == undefined || refresh == false) {
      result = PlaceUsersList.ALL.getById(id);
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


}

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserDetails } from '../../../_models/request/UserDetails';
import { PlaceDetailsList, PlaceDetails } from '../../../_models/request/PlaceDetails';
import { UserContent } from '../../../_models/util/Content';
import { PlaceService } from '../place/place/place.service';
import { Category } from '../../../_models/request/Category';
import { CategoryApiService } from '../../api/utils/category-api.service';
import { Item } from '../../../_models/request/item/Item';
import { ItemService } from '../item/item/item.service';
import { PlaceApiService } from '../../api/place/place-api.service';
import { InstanceService } from '../instance/instance.service';
import {AccountApiService} from "../../api/account/account-api.service";
import {ItemsList} from "../../../_models/request/item/ItemsList";
import {IdSelector} from "../../utils/EntitySelector";
import {PlaceUsersList} from "../../../_models/request/place-user/PlaceUsersList";
import {KeyName, KeyNameList} from "../../../_models/request/KeyName";
import {ErrorMessage} from "../../../_models/util/ErrorMessage";
import {HttpErrorResponse} from "@angular/common/http";
import {PlaceUser} from "../../../_models/request/place-user/PlaceUser";

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

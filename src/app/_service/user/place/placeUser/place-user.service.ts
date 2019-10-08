import {Injectable} from '@angular/core';
import {PlaceDetails} from '../../../../_models/response/PlaceDetails';
import {KeyName} from '../../../../_models/response/KeyName';
import {ErrorMessage} from '../../../../_models/util/ErrorMessage';
import {PlaceApiService} from '../../../api/place/place-api.service';
import {HttpErrorResponse} from '@angular/common/http';
import {PlaceUser} from '../../../../_models/response/place-user/PlaceUser';

@Injectable({
  providedIn: 'root'
})
export class PlaceUserService {

  constructor(private placeApi: PlaceApiService) { }

  public removeUser(place: PlaceDetails, user: KeyName) {
    return this.placeApi.removeUser(place.id, user.id)
      .then(res => {
        if(res)
          place.users[user.id].status = false;
      });
  }


  public changeAdmin(place: PlaceDetails, user: KeyName){

    return this.placeApi.changeAdmin(place.id, user.id)
      .then(res => {
        if(res)
          place.adminId = user.id;
        else
          throw new Error("Couldn't promote this user.");
      })
      .catch(e => new ErrorMessage(e.message));

  }


  public addUser(place: PlaceDetails, user: KeyName): Promise<PlaceUser> {
    let processResult = (r: boolean) => {
      if(r)
        return PlaceUser.added(user, place, true);
    };

    return this.placeApi.addUser(place.id, user.id)
                        .then(processResult);
  }

}

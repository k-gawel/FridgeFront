import {Injectable} from '@angular/core';
import {Place} from '../../../../_models/response/Place';
import {KeyName} from '../../../../_models/response/KeyName';
import {ErrorMessage} from '../../../../_models/util/ErrorMessage';
import {PlaceApiService} from '../../../api/place/place-api.service';
import {PlaceUser} from '../../../../_models/response/place-user/PlaceUser';

@Injectable({
  providedIn: 'root'
})
export class PlaceUserService {

  constructor(private placeApi: PlaceApiService) { }

  public removeUser(place: Place, user: KeyName) {
    return this.placeApi.removeUser(place.id, user.id)
      .then(res => {
        if(res)
          place.users[user.id].status = false;
      });
  }


  public changeAdmin(place: Place, user: KeyName){

    return this.placeApi.changeAdmin(place.id, user.id)
      .then(res => {
        if(res)
          place.adminId = user.id;
        else
          throw new Error("Couldn't promote this user.");
      })
      .catch(e => new ErrorMessage(e.message));

  }


  public addUser(place: Place, user: KeyName): Promise<PlaceUser> {
    let processResult = (r: boolean) => {
      if(r)
        return PlaceUser.added(user, place, true);
    };

    return this.placeApi.addUser(place.id, user.id)
                        .then(processResult);
  }

}

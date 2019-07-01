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

  public removeUser(place: PlaceDetails, user: KeyName | number) {
    user  = typeof user  === 'number' ? user  : user.id;

    return this.placeApi.removeUser(place.id, user)
      .then(res => {
        if(res) place.users.remove(user);
        else throw new Error("Couldn't remove user.");
      })
      .catch(e => new ErrorMessage(e.message));
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


  public addUser(place: PlaceDetails, user: KeyName) {

    return this.placeApi.addUser(place.id, user.id)
      .then(res => {
        if(!res)
          throw new Error("Could not add user");
        else
          PlaceUserService.addUserToPlace(user, place);
      })
      .catch((e: HttpErrorResponse) => new ErrorMessage(e.message))

  }

  private static addUserToPlace(user: KeyName, place: PlaceDetails) {
    let placeUser = place.users.getById(user.id);
    if(placeUser == undefined)
      placeUser = PlaceUser.clone(user, true);
    place.users.push(placeUser);
  }


}

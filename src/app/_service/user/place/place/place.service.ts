import {Injectable} from '@angular/core';
import {PlaceDetails, PlaceDetailsList} from '../../../../_models/request/PlaceDetails';
import {PlaceApiService} from '../../../api/place/place-api.service';
import {KeyName} from '../../../../_models/request/KeyName';
import {PlaceForm} from "../../../../_models/response/PlaceForm";
import {ErrorMessage} from "../../../../_models/util/ErrorMessage";
import {HttpErrorResponse} from "@angular/common/http";
import {IdSelector} from "../../../utils/EntitySelector";

@Injectable({
  providedIn: 'root'
})
export class PlaceService {

  constructor(private placeApi: PlaceApiService) { }


  public newPlace(form: PlaceForm): Promise<PlaceDetails> {

    if(!form.validate())
      throw form.errors;

    return this.placeApi.newPlace(form)
      .then((response: JSON) => {
        if(response == null)
          throw new ErrorMessage("placecreate.unable");
        return new PlaceDetails(response);
      })
      .catch((e: HttpErrorResponse) => {
        throw new ErrorMessage(e.message);
      })

  }


  public getById(id: IdSelector): Promise<PlaceDetails> {

    return this.placeApi.get(id.id)
      .then((response: JSON[]) => {
        let placesList = new PlaceDetailsList(response);
        console.log(placesList);
        if(placesList.size() !== 1)
          throw new ErrorMessage("placegetbyid.size!=1");
        else
          return placesList.list[0];
      })
      .catch((e: ErrorMessage) => {
        throw new ErrorMessage(e.message);
      })

  }


  public addUser(place: PlaceDetails, user: KeyName): Promise<boolean> {

    return this.placeApi.addUser(place.id, user.id)
      .then((res: boolean) => {
        return res;
      })
      .catch((e: HttpErrorResponse) => {
        throw new ErrorMessage(e.message);
      })

  }


  public changeAdmin(place: PlaceDetails, user: KeyName): Promise<boolean> {

    return this.placeApi.changeAdmin(place.id, user.id)
      .then((res: boolean) => {
        if(res) {
          place.adminId = user.id;
        }
        return res;
      })
      .catch((e: HttpErrorResponse) => {
        throw new ErrorMessage(e.message);
      })

  }


  public removeUser(place: PlaceDetails, user: KeyName): Promise<boolean> {

    return this.placeApi.removeUser(place.id, user.id)
      .then((res: boolean) => {
        return res;
      })
      .catch((e: HttpErrorResponse) => {
        throw new ErrorMessage(e.message);
      })

  }



}

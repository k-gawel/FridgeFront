import {Injectable} from '@angular/core';
import {ApiService} from '../api/api.service';
import {HttpParams} from '@angular/common/http';
import {PlaceForm} from '../../../_models/request/PlaceForm';

@Injectable({
  providedIn: 'root'
})
export class PlaceApiService {

  private url = this.api.url + "places";

  constructor(private api: ApiService) { }


  public newPlace(form: PlaceForm) {
    let url = this.url;
    let body = form;
    let header = this.api.getHeaderWithToken();

    return this.api.post(url, body, header);
  }


  public get(placeIds: number[] | number) {
    let url = this.url + "/" + ApiService.numbersArrayToString(placeIds);
    let header = this.api.getHeaderWithToken();

    return this.api.get(url, header, null);
  }


  public addUser(placeId: number, userId: number) {
    let url = this.url + "/" + placeId + "/accounts/" + userId;
    let header = this.api.getHeaderWithToken();

    return this.api.post(url, null, header);
  }


  public changeAdmin(placeId: number, newAdminId: number) {
    let url = this.url +"/" + placeId + "/admin/" + newAdminId;
    let header = this.api.getHeaderWithToken();

    return this.api.put(url, null, null, header);
  }


  public removeUser(placeId: number, userId: number) {
    let url = this.url + "/" + placeId + "/accounts/" + userId;
    let header = this.api.getHeaderWithToken();

    return this.api.delete(url, header, null);
  }


}

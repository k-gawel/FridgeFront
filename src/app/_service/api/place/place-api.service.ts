import {Injectable} from '@angular/core';
import {ApiService} from '../api/api.service';
import {HttpParams} from '@angular/common/http';
import {PlaceForm} from '../../../_models/response/PlaceForm';

@Injectable({
  providedIn: 'root'
})
export class PlaceApiService {

  private url = this.api.url + "place/";

  constructor(private api: ApiService) { }


  public newPlace(form: PlaceForm) {
    let url = this.url + "new";
    let body = form;
    let header = this.api.getHeaderWithToken();

    return this.api.post(url, body, header);
  }


  public get(placeIds: number[] | number) {
    let url = this.url + "get";
    let params = new HttpParams();
    params = params.append("ids", ApiService.numbersArrayToString(placeIds));
    let header = this.api.getHeaderWithToken();

    return this.api.get(url, header, params);
  }

  public addUser(placeId: number, userId: number) {
    let url = this.url + "addUser";
    let params = new HttpParams();
    params = params.append("placeId", placeId.toString());
    params = params.append("userId", userId.toString());
    let header = this.api.getHeaderWithToken();

    return this.api.put<boolean>(url, params, null, header);
  }


  public changeAdmin(placeId: number, newAdminId: number) {
    let url = this.url + "change_admin";
    let params = new HttpParams();
    params = params.append("place_id", placeId.toString());
    params = params.append("new_admin_id", newAdminId.toString());
    let header = this.api.getHeaderWithToken();

    return this.api.put<boolean>(url, params, null, header);
  }


  public removeUser(placeId: number, userId: number) {
    let url = this.url + "removeUser";
    let params = new HttpParams();
    params = params.append("placeId", placeId.toString());
    params = params.append("userId", userId.toString());
    let header = this.api.getHeaderWithToken();

    return this.api.delete<boolean>(url, header, params);
  }


}

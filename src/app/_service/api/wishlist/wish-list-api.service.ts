import {Injectable} from '@angular/core';
import {ApiService} from '../api/api.service';
import {WishListForm} from '../../../_models/request/WishList';
import {HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WishListApiService {

  private url: string = this.api.url + "wishlists";

  constructor(private api: ApiService) {
  }

  public newWishList(form: WishListForm) {
    let header = this.api.getHeaderWithToken();
    let body = form;

    return this.api.post(this.url, body, header);
  }

  public get(placeIds: number[] | number, wishListIds: number[] | number, active: Boolean) {
    let header = this.api.getHeaderWithToken();
    let params = new HttpParams();
    if(placeIds != null)
      params = params.append("placeIds", ApiService.numbersArrayToString(placeIds));
    if(wishListIds != null)
      params = params.append("ids", ApiService.numbersArrayToString(wishListIds));
    if(active != null)
      params = params.append("active", active.toString());

    return this.api.get(this.url, header, params);
  }

  public archivize(id: number) {
    let header = this.api.getHeaderWithToken();
    let params = new HttpParams();
    params.set("id", id.toString());

    return this.api.delete(this.url, header, params);
  }




}

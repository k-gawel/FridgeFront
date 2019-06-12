import {Injectable} from '@angular/core';
import {ApiService} from '../api/api.service';
import {WishListForm} from '../../../_models/response/WishList';
import {HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WishListApiService {

  private url: string = this.api.url + "wishlist/";

  constructor(private api: ApiService) {
  }

  public newWishList(form: WishListForm) {
    let url = this.url + "newWishlist";
    let header = this.api.getHeaderWithToken();
    let body = form;

    return this.api.post(url, body, header);
  }

  public get(placeIds: number[] | number, wishListIds: number[] | number, active: Boolean) {
    let url = this.url + "get";
    let header = this.api.getHeaderWithToken();
    let params = new HttpParams();
    if(placeIds != null)
      params = params.append("placeIds", ApiService.numbersArrayToString(placeIds));
    if(wishListIds != null)
      params = params.append("ids", ApiService.numbersArrayToString(wishListIds));
    if(active != null)
      params = params.append("active", active.toString());

    return this.api.get(url, header, params);
  }

  public archivize(id: number) {
    let url = this.url + "archivize";
    let header = this.api.getHeaderWithToken();
    let params = new HttpParams();
    params.set("id", id.toString());
    let body = null;

    return this.api.put(url, params, body, header);
  }




}

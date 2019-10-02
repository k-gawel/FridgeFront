import {Injectable} from '@angular/core';
import {ApiService} from '../api/api.service';
import {WishListForm} from '../../../_models/request/wishlist/WishListForm';
import {HttpParams} from '@angular/common/http';
import {OffsetLimit} from "../../../_util/OffsetLimit";

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


  public get(placeIds: number[] | number, wishListIds: number[] | number, active: Boolean, offsetLimit: OffsetLimit) {
    let header = this.api.getHeaderWithToken();
    let params = new HttpParams();
    if(placeIds != null)
      params = params.append("placeIds", ApiService.numbersArrayToString(placeIds));
    if(wishListIds != null)
      params = params.append("ids", ApiService.numbersArrayToString(wishListIds));
    if(active != null)
      params = params.append("active", active.toString());
    if(offsetLimit != null)
      params = offsetLimit.appendToParams(params);

    return this.api.get(this.url, header, params);
  }


  public archive(id: number) {
    let url = this.url + "/" + id;
    let header = this.api.getHeaderWithToken();

    return this.api.delete(url, header, null);
  }


}

import {Injectable} from '@angular/core';
import {ApiService} from '../api/api.service';
import {WishListItemForm} from '../../../_models/request/wishlistitem/WishListItemForm';
import {HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WishListItemApiService {

  private url: string = this.api.url + "wish_list_items";

  constructor(private api: ApiService) {
  }

  public newItem(form: WishListItemForm) {
    let url = this.url;
    let body = form;
    let header = this.api.getHeaderWithToken();

    return this.api.post(url, body, header);
  }

  public addInstance(wishListItemId: number, instanceId: number) {
    let url = this.url + "/" + wishListItemId + "/instances/" + instanceId;
    let header = this.api.getHeaderWithToken();

    return this.api.post(url, null, header);
  }

  public get(id: number | number[]) {
    let url = this.url + "get";
    let header = this.api.getHeaderWithToken();
    let params = new HttpParams();
    params.append("id", id.toString());

    return this.api.get(url, header, params);
  }



}

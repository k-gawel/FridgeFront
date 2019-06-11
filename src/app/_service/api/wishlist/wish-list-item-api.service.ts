import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { WishListItemForm } from '../../../_models/response/WishListItemForm';
import { ItemInstanceForm } from '../../../_models/response/ItemInstanceForm';
import {ItemInstance} from "../../../_models/request/item/ItemInstance";
import {HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class WishListItemApiService {

  private url: string = this.api.url + "wishListItem/";

  constructor(private api: ApiService) {
  }

  public newItem(form: WishListItemForm) {
    let url = this.url + "new";
    let body = form;
    let header = this.api.getHeaderWithToken();

    return this.api.post(url, body, header);
  }

  public addInstance(wishListItemId: number, instanceForm: ItemInstanceForm) {

    let url = this.url + wishListItemId + "/addInstance";
    let header = this.api.getHeaderWithToken();
    let body = instanceForm;

    return this.api.post(url, body, header);
  }

  public get(id: number | number[]) {
    let url = this.url + "get";
    let header = this.api.getHeaderWithToken();
    let params = new HttpParams();
    params.append("id", id.toString());

    return this.api.get(url, header, params);
  }



}

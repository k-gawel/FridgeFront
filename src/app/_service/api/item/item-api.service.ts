import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import {ItemForm} from '../../../_models/response/ItemForm';
import { Category } from '../../../_models/request/Category';
import {HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ItemApiService {

  private url: string = this.api.url + "item/";

  constructor(private api: ApiService) {}

  public newItem(form: ItemForm) {
    let url = this.url + "newItem";
    let body = form;
    let header = this.api.getHeaderWithToken();

    return this.api.post(url, body, header);
  }

  public search(itemIds: number | number[], placeIds: number | number[], name: string,
                barcode: Number, category: Number) {
    let url = this.url + "search";
    let header = this.api.getHeaderWithToken();
    let params = new HttpParams();
    if(itemIds != null)
      params = params.append("itemIds", ApiService.numbersArrayToString(itemIds));
    if(placeIds != null)
      params = params.append("placeIds", ApiService.numbersArrayToString(placeIds));
    if(name != null)
      params = params.append("name", name);
    if(barcode != null)
      params = params.append("barcode", barcode.toString());
    if(category != null)
      params = params.append("category", category.toString());

    return this.api.get(url, header, params);
  }



}

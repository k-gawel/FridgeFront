import {Injectable} from '@angular/core';
import {ApiService} from '../api/api.service';
import {ItemForm} from '../../../_models/request/item/ItemForm';
import {HttpParams} from '@angular/common/http';
import {ItemGetQuery} from "../../../_models/request/item/ItemGetQuery";
import {OffsetLimit} from "../../../_util/OffsetLimit";

@Injectable({
  providedIn: 'root'
})
export class ItemApiService {

  private url: string = this.api.url + "items";

  constructor(private api: ApiService) {}


  public newItem(form: ItemForm) {
    const mapToObject = (map) => {
      const obj = {};
      map.forEach((value, key) => obj[key] = value);
      return obj;
    };

    let url = this.url;

    let body = Object.assign({}, form);
    // @ts-ignore
    body.allergens = mapToObject(form.allergens);
    // @ts-ignore
    body.ingredients = Array.from(form.ingredients);
  // @ts-ignore
    body.capacity = form.capacity.toString();

    let header = this.api.getHeaderWithToken();

    return this.api.post(url, body, header);
  }


  public search(query: ItemGetQuery) {
    let url    = this.url;
    let header = this.api.getHeaderWithToken();
    let params = query.toHttpParams();

    return this.api.get(url, header, params);
  }



}

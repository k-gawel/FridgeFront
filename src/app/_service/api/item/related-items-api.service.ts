import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import {HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RelatedItemsApiService {

  url: string;

  constructor(private api: ApiService) {
    this.url = api.url + 'items';
   }

  getMostPopularByPlaceAndCategory(place: number, category: number) {
    let url = this.url;
    let headers = this.api.getHeaderWithToken();
    let params = new HttpParams();
    params = params.append("placeIds", ApiService.numbersArrayToString(place));
    params = params.append("categoryId", category.toString());
    params = params.append("params", "most_popular");

    return this.api.get(url, headers, params);
  }
}

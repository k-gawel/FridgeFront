import {Injectable} from '@angular/core';
import {ApiService} from '../api/api.service';
import {HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RelatedItemsApiService {

  url: string;

  constructor(private api: ApiService) {
    this.url = api.url + 'related_items';
   }

  getMostPopularByPlaceAndCategory(place: number, category: number) {
    let url = this.url;
    let headers = this.api.getHeaderWithToken();
    let params = new HttpParams();
    params = params.append("place_ids", ApiService.numbersArrayToString(place));
    params = params.append("category_id", category.toString());
    params = params.append("params", "most_popular");

    return this.api.get(url, headers, params);
  }

  getAll(placeID: number, categoryID: number) {
    let url = this.url;
    let headers = this.api.getHeaderWithToken();
    let params = new HttpParams();
    params = params.append("place_ids", ApiService.numbersArrayToString(placeID));
    params = params.append("categoryId", categoryID.toString());
    params = params.append("params", "all");

    return this.api.get(url, headers, params);
  }
}

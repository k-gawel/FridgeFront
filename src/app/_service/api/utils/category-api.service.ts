import {Injectable} from '@angular/core';
import {ApiService} from '../api/api.service';
import {HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryApiService {

  private url = this.api.url + "category/";

  constructor(private api: ApiService) { }

  public getAllCategories() {
    let url = this.url + "getAllCategories";
    let headers = null;
    let params = new HttpParams();
    return this.api.get(url, headers, params);
  }

}

import { Injectable } from '@angular/core';
import {HttpParams} from "@angular/common/http";
import {ApiService} from "../api/api.service";

@Injectable({
  providedIn: 'root'
})
export class IngredientApiService {

  url: string = this.api.url + "ingredient/";

  constructor(private api: ApiService) {}


  public getByIds(ids: number[] | number) {
    let url = this.url + "get";
    let params: HttpParams = new HttpParams();
    params = params.append("ids", ids.toString());

    return this.api.get(url, null, params);
  }


  public getByName(name: string) {
    let url = this.url + "get";
    let params: HttpParams = new HttpParams();
    params = params.append("name", name);

    return this.api.get(url, null, params);
  }


  public searchByName(name: string) {
    let url = this.url + "search";
    let params: HttpParams = new HttpParams();
    params = params.append("name", name);

    return this.api.get(url, null, params);
  }


  public getWhereNameStartsWith(nameStart: string) {
    let url = this.url + "search";
    let params = new HttpParams();
    params = params.append("nameStart", nameStart);

    return this.api.get(url, null, params);
  }

}

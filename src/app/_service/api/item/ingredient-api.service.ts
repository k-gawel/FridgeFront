import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {ApiService} from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class IngredientApiService {

  url: string = this.api.url + "ingredients";

  constructor(private api: ApiService) {}


  public getByIds(ids: number[] | number) {
    let url = this.url;
    let params: HttpParams = new HttpParams();
    params = params.append("ingredients", ids.toString());

    return this.api.get(url, null, params);
  }


  public searchByName(name: string) {
    let url = this.url;
    let params: HttpParams = new HttpParams();
    params = params.append("name", name);

    return this.api.get(url, null, params);
  }


  public getWhereNameStartsWith(nameStart: string) {
    let url = this.url;
    let params = new HttpParams();
    params = params.append("nameStart", nameStart);

    return this.api.get(url, null, params);
  }

}

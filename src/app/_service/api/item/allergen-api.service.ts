import {Injectable} from '@angular/core';
import {ApiService} from '../api/api.service';
import {HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AllergenApiService {

  url: string = this.api.url + "allergens";

  constructor(private api: ApiService) { }

  public getByIds(ids: number[] | number) {
    let url = this.url;
    let params: HttpParams = new HttpParams();
    params = params.append("ids", ids.toString());

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

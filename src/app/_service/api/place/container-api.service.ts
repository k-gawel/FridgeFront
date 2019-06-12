import {Injectable} from '@angular/core';
import {ApiService} from '../api/api.service';
import {HttpParams} from '@angular/common/http';
import {ContainerForm} from '../../../_models/response/ContainerForm';

@Injectable({
  providedIn: 'root'
})
export class ContainerApiService {

  private url = this.api.url + "container/";

  constructor(private api: ApiService) {
  }


  public addNewContainer(form: ContainerForm) {
    let url = this.url + "addNewContainer";
    let body = form;
    let header = this.api.getHeaderWithToken();

    return this.api.post(url, body, header);
  }


  public get(ids: number[] | number, placeIds: number[] | number) {let url = this.url + "get";
    let params = new HttpParams();
    if (ids != null)
      params = params.append("ids", ApiService.numbersArrayToString(ids));
    if(placeIds != null)
      params = params.append("placeIds", ApiService.numbersArrayToString(placeIds));
    let header = this.api.getHeaderWithToken();

    return this.api.get(url, header, params);
  }


  public getUsersStats(userIds: number[], placeIds: number[], containerIds: number[]) {
    let url = this.url + "user_stats";
    let params = new HttpParams();
    if(userIds != null)
      params = params.append("user_ids", ApiService.numbersArrayToString(userIds));
    if(containerIds != undefined)
      params = params.append("container_ids", ApiService.numbersArrayToString(containerIds));
    if(placeIds != undefined)
      params = params.append("place_ids", ApiService.numbersArrayToString(placeIds));
    let headers = this.api.getHeaderWithToken();

    return this.api.get(url, headers, params);
  }

}

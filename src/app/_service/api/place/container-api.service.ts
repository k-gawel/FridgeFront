import {Injectable} from '@angular/core';
import {ApiService} from '../api/api.service';
import {HttpParams} from '@angular/common/http';
import {ContainerForm} from '../../../_models/request/container/ContainerForm';

@Injectable({
  providedIn: 'root'
})
export class ContainerApiService {

  private url = this.api.url + "containers";

  constructor(private api: ApiService) {
  }


  public addNewContainer(form: ContainerForm) {
    let url = this.url;
    let body = form;
    let header = this.api.getHeaderWithToken();

    return this.api.post(url, body, header);
  }


  public get(ids: number[] | number, placeIds: number[] | number) {
    let url = this.url;
    let params = new HttpParams();
    if (ids != null)
      params = params.append("containers", ApiService.numbersArrayToString(ids));
    if(placeIds != null)
      params = params.append("places", ApiService.numbersArrayToString(placeIds));
    let header = this.api.getHeaderWithToken();

    return this.api.get(url, header, params);
  }


  public getUsersStats(userIds: number[], placeIds: number[], containerIds: number[]) {
    let url = this.url + "user_stats";
    let params = new HttpParams();
    if(userIds != null)
      params = params.append("users", ApiService.numbersArrayToString(userIds));
    if(containerIds != undefined)
      params = params.append("container", ApiService.numbersArrayToString(containerIds));
    if(placeIds != undefined)
      params = params.append("place", ApiService.numbersArrayToString(placeIds));
    let headers = this.api.getHeaderWithToken();

    return this.api.get(url, headers, params);
  }

}

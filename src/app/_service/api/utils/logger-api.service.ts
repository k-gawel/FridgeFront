import { Injectable } from '@angular/core';
import {ApiService} from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class LoggerApiService {

  constructor(private api: ApiService) {
    this.url = api.url + "logs/"
  }

  url: string;

  public getInstanceChangesByPlace(placesId: number, limit: number) {

    let url = this.url + "_instances/byPlace/" + placesId + "/limit/" + limit;
    let headers = this.api.getHeaderWithToken();
    let params = null;

    return this.api.get(url, headers, null);
  }

}

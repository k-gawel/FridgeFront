import {Injectable} from '@angular/core';
import {ApiService} from '../api/api.service';
import {OffsetLimit} from "../../../_util/OffsetLimit";
import {HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class LoggerApiService {

  constructor(private api: ApiService) {
    this.url = api.url + "logs/"
  }

  url: string;


}

import { Injectable } from '@angular/core';
import {ApiService} from '../api/api.service';
import {KeyName} from '../../../_models/request/KeyName';

@Injectable({
  providedIn: 'root'
})
export class PlaceAdminApiService {

  constructor(private apiService: ApiService) {
  }

}

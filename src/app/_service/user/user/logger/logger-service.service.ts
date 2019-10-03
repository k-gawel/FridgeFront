import {Injectable} from '@angular/core';
import {LoggerApiService} from '../../../api/utils/logger-api.service';
import {PlaceDetails} from '../../../../_models/response/PlaceDetails';
import {InstanceChangeList} from '../../../../_models/response/item/InstanceChange';

@Injectable({
  providedIn: 'root'
})
export class LoggerServiceService {

  constructor(private loggerApi: LoggerApiService) { }

}

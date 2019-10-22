import {Injectable} from '@angular/core';
import {LoggerApiService} from '../../../api/utils/logger-api.service';

@Injectable({
  providedIn: 'root'
})
export class LoggerServiceService {

  constructor(private loggerApi: LoggerApiService) { }

}

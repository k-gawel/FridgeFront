import {Injectable} from '@angular/core';
import {LoggerApiService} from '../../../api/utils/logger-api.service';
import {PlaceDetails} from '../../../../_models/request/PlaceDetails';
import {InstanceChangeList} from '../../../../_models/request/InstanceChange';

@Injectable({
  providedIn: 'root'
})
export class LoggerServiceService {

  constructor(private loggerApi: LoggerApiService) { }

  public async getInstancesChangesByPlace(place: PlaceDetails | number): Promise<InstanceChangeList> {

    let placeId: number = place instanceof PlaceDetails ? place.id : place;

    let result: InstanceChangeList;

    await this.loggerApi.getInstanceChangesByPlace(placeId, 10).then( (res: JSON) => {
      result = InstanceChangeList.fromJSON(res);
    }  ).catch( (e: Error) => {
      console.log(e.message);
      result = null;
    } )

    return result;

  }

}

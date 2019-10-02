import {Injectable} from '@angular/core';
import {LoggerApiService} from '../../../api/utils/logger-api.service';
import {PlaceDetails} from '../../../../_models/response/PlaceDetails';
import {InstanceChangeList} from '../../../../_models/response/item/InstanceChange';

@Injectable({
  providedIn: 'root'
})
export class LoggerServiceService {

  constructor(private loggerApi: LoggerApiService) { }

  public async getInstancesChangesByPlace(place: PlaceDetails | number): Promise<InstanceChangeList> {
    let placeId: number = place instanceof PlaceDetails ? place.id : place;

    let result: InstanceChangeList;

    return this.loggerApi.getInstanceChangesByPlace(placeId, 10)
      .then( (res: JSON[]) => new InstanceChangeList(res) )
      .catch( (e: Error) => null );

  }

}

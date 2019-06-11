import { Injectable } from '@angular/core';
import {PlaceDetails} from '../../../../_models/request/PlaceDetails';
import {IdSelector} from "../../../utils/EntitySelector";
import {ContainerService} from "../container/container.service";
import {ContainerApiService} from "../../../api/place/container-api.service";
import {PlaceUserStats, PlaceUserStatsList} from "../../../../_models/request/place/place-user-stats";
import {ErrorMessage} from "../../../../_models/util/ErrorMessage";
import {HttpErrorResponse} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PlaceUserService {

  constructor(private containerApi: ContainerApiService) { }


  public getStats(users: IdSelector, containers: IdSelector, places: IdSelector): Promise<PlaceUserStatsList> {

    let userIds = users != null ? users.id : null;
    let containerIds = containers != null ? containers.id : null;
    let placeIds = places != null ? places.id : null;

    return this.containerApi.getUsersStats(userIds, placeIds, containerIds)
      .then((res: JSON[]) => {
        if(res != null)
          return new PlaceUserStatsList(res);
        else
          throw new ErrorMessage("result was null");
      })
      .catch((e: HttpErrorResponse) => {
        throw new ErrorMessage(e.message);
      })

  }

  public getPlaceStats(place: PlaceDetails): Promise<PlaceUserStatsList> {
    let placeId = new IdSelector(place);

    return this.getStats(null, null, placeId);
  }


}

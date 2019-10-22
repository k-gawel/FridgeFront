import {Injectable} from '@angular/core';
import {Place, PlacesList} from '../../../../_models/response/Place';
import {PlaceApiService} from '../../../api/place/place-api.service';
import {KeyName} from '../../../../_models/response/KeyName';
import {PlaceForm} from '../../../../_models/request/place/PlaceForm';
import {IdSelector} from '../../../utils/EntitySelector';
import {ErrorHandlerService} from '../../../utils/errorhanler/error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class PlaceService {

  constructor(private placeApi: PlaceApiService,
              private errorHandler: ErrorHandlerService) { }


  public newPlace(form: PlaceForm): Promise<Place> {
    return this.placeApi.newPlace(form)
      .then((response: JSON) => new Place(response) )
      .catch(e => this.errorHandler.processFormError(form, e) );
  }


  public removePlace(place: KeyName) {

  }


  public getById(ids: IdSelector): Promise<Place> {
    let id = ids.id[0];

    return this.placeApi.get(id)
      .then((response: JSON[]) => new PlacesList(response)[id]);
  }


}

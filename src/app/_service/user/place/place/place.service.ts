import {Injectable} from '@angular/core';
import {PlaceDetails, PlaceDetailsList} from '../../../../_models/response/PlaceDetails';
import {PlaceApiService} from '../../../api/place/place-api.service';
import {KeyName} from '../../../../_models/response/KeyName';
import {PlaceForm} from '../../../../_models/request/place/PlaceForm';
import {ErrorMessage} from '../../../../_models/util/ErrorMessage';
import {HttpErrorResponse} from '@angular/common/http';
import {IdSelector} from '../../../utils/EntitySelector';
import {ErrorHandlerService} from '../../../utils/errorhanler/error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class PlaceService {

  constructor(private placeApi: PlaceApiService,
              private errorHandler: ErrorHandlerService) { }


  public newPlace(form: PlaceForm): Promise<PlaceDetails> {
    return this.placeApi.newPlace(form)
      .then((response: JSON) => new PlaceDetails(response) )
      .catch(e => this.errorHandler.processFormError(form, e) );
  }


  public removePlace(place: KeyName) {

  }


  public getById(ids: IdSelector): Promise<PlaceDetails> {
    let id = ids.id[0];

    return this.placeApi.get(id)
      .then((response: JSON[]) => new PlaceDetailsList(response)[id]);
  }


}

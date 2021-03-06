import {Injectable} from '@angular/core';
import {ContainerApiService} from '../../../api/place/container-api.service';
import {ContainerForm} from '../../../../_models/request/ContainerForm';
import {Container, ContainersList} from '../../../../_models/response/Container';
import {ErrorMessage} from '../../../../_models/util/ErrorMessage';
import {HttpErrorResponse} from '@angular/common/http';
import {KeyName} from '../../../../_models/response/KeyName';
import {IdSelector} from '../../../utils/EntitySelector';
import {PlaceDetails} from '../../../../_models/response/PlaceDetails';

@Injectable({
  providedIn: 'root'
})
export class ContainerService {

  constructor(private containerApi: ContainerApiService) { }





  public addNewContainer(form: ContainerForm): Promise<Container> {

    if(!form.validate())
      throw form.errors;

    return this.containerApi.addNewContainer(form)
      .then((result: JSON) => {
        if(result == null)
          throw new ErrorMessage("containercreate.unable");
        return new Container(result);
      })
      .catch((e: HttpErrorResponse) => {
        throw new ErrorMessage(e.message);
      });

  }


  public removeContainer(container: KeyName) {
    //TODO Remove containerId
  }


  public async get(ids: number[]): Promise<ContainersList> {

    let idsToFind: number[] = [];

    let result: ContainersList = new ContainersList();

    ids.forEach( (id: number) => {
      let foundContainer = ContainersList.ALL.getById(id);
      if(foundContainer != null)
        result.push(foundContainer);
      else
        idsToFind.push(id);
    });

    if(idsToFind.length == 0)
      return result;

    return this.containerApi.get(idsToFind, null)
      .then((res: JSON[]) => {
        return new ContainersList(res);
      })
      .catch((e: HttpErrorResponse) => {
        throw new ErrorMessage(e.message);
      })

  }


  getByPlace(places: IdSelector | PlaceDetails) {


    return this.containerApi.get(null, places.id )
      .then( (result: JSON[]) => {
        if(result == null)
          throw new ErrorMessage("containerget.null");
        return new ContainersList(result);
      })
      .catch((e: HttpErrorResponse) => {
        throw new ErrorMessage(e.message);
      })

  }


}

import {Injectable} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {ErrorMessage} from '../../../../_models/util/ErrorMessage';
import {ProducerApiService} from '../../../api/item/producer-api.service';
import {Producer} from '../../../../_models/request/item/Producer';

@Injectable({
  providedIn: 'root'
})
export class ProducerService {


  constructor(private producerApi: ProducerApiService) {}


  public getByIds(ids: number | number[]): Promise<Producer[]> {

    return this.producerApi.getByIds(ids)
      .then((res: JSON[]) => {
        return res == null ? [] : res.map(e => new Producer(e));
      })
      .catch((e: HttpErrorResponse) => {
        throw new ErrorMessage(e);
      })

  }


  public getByName(name: string): Promise<Producer> {

    return this.producerApi.getByName(name)
      .then((res: JSON[]) => {
        return res != null && res.length != 0 ? new Producer(res[0]) : null;
      })
      .catch((e: HttpErrorResponse) => {
        throw new ErrorMessage(e);
      });

  }


  public searchByName(name: string): Promise<Producer[]> {

    return this.producerApi.searchByName(name)
      .then((res: JSON[]) => {
        return res == null ? [] : res.map(e => new Producer(e));
      })
      .catch((e: HttpErrorResponse) => {
        throw new ErrorMessage(e);
      });

  }


  public getByNameStartsWith(nameStart: string): Promise<Producer[]> {

    return this.producerApi.getWhereNameStartsWith(name)
      .then((res: JSON[]) => {
        return res == null ? [] : res.map(e => new Producer(e));
      })
      .catch((e: HttpErrorResponse) => {
        throw new ErrorMessage(e);
      });

  }

}

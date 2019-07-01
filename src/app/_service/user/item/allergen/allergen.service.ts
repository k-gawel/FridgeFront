import {Injectable} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {ErrorMessage} from '../../../../_models/util/ErrorMessage';
import {AllergenApiService} from '../../../api/item/allergen-api.service';
import {Allergen} from '../../../../_models/response/item/Item';

@Injectable({
  providedIn: 'root'
})
export class AllergenService {

  constructor(private allergenApi: AllergenApiService) {}


  public getByIds(ids: number | number[]): Promise<Allergen[]> {

    return this.allergenApi.getByIds(ids)
      .then((res: JSON[]) => {
        return res == null ? [] : res.map(e => new Allergen(e));
      })
      .catch((e: HttpErrorResponse) => {
        throw new ErrorMessage(e);
      })

  }


  public searchByName(name: string): Promise<Allergen[]> {

    return this.allergenApi.searchByName(name)
      .then((res: JSON[]) => {
        return res == null ? [] : res.map(e => new Allergen(e));
      })
      .catch((e: HttpErrorResponse) => {
        throw new ErrorMessage(e);
      });

  }


  public getByNameStartsWith(nameStart: string): Promise<Allergen[]> {

    return this.allergenApi.getWhereNameStartsWith(name)
      .then((res: JSON[]) => {
        return res == null ? [] : res.map(e => new Allergen(e));
      })
      .catch((e: HttpErrorResponse) => {
        throw new ErrorMessage(e);
      });

  }}

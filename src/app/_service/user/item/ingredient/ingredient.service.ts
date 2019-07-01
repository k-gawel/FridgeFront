import {Injectable} from '@angular/core';
import {Ingredient} from '../../../../_models/response/item/Item';
import {HttpErrorResponse} from '@angular/common/http';
import {ErrorMessage} from '../../../../_models/util/ErrorMessage';
import {IngredientApiService} from '../../../api/item/ingredient-api.service';

@Injectable({
  providedIn: 'root'
})
export class IngredientService {

  constructor(private ingredientApi: IngredientApiService) {}


  public getByIds(ids: number | number[]): Promise<Ingredient[]> {

    return this.ingredientApi.getByIds(ids)
      .then((res: JSON[]) => {
        return res == null ? [] : res.map(e => new Ingredient(e));
      })
      .catch((e: HttpErrorResponse) => {
        throw new ErrorMessage(e);
      })

  }


  public searchByName(name: string): Promise<Ingredient[]> {

    return this.ingredientApi.searchByName(name)
      .then((res: JSON[]) => {
        return res == null ? [] : <Ingredient[]> res.map(e => new Ingredient(e));
      })
      .catch((e: HttpErrorResponse) => {
        throw new ErrorMessage(e);
      });

  }


  public getByNameStartsWith(nameStart: string): Promise<Ingredient[]> {

    return this.ingredientApi.getWhereNameStartsWith(name)
      .then((res: JSON[]) => {
        return res == null ? [] : res.map(e => new Ingredient(e));
      })
      .catch((e: HttpErrorResponse) => {
        throw new ErrorMessage(e);
      });

  }


}

import { Injectable } from '@angular/core';
import { RelatedItemsApiService } from '../../../api/item/related-items-api.service';
import { PlaceDetails } from '../../../../_models/request/PlaceDetails';
import { Category } from '../../../../_models/request/Category';
import { ItemsList } from '../../../../_models/request/item/ItemsList';
import {HttpErrorResponse} from "@angular/common/http";
import {ErrorMessage} from "../../../../_models/util/ErrorMessage";

@Injectable({
  providedIn: 'root'
})
export class RelatedItemsService {

  constructor(private relatedItemsApi: RelatedItemsApiService) { }

  mostPopularOfCategory: Map<number, ItemsList> = new Map<number, ItemsList>();

  public async getMostPopular(category: Category | number, place: PlaceDetails | number): Promise<ItemsList> {

    let placeId: number = typeof place === 'number' ? place : place.id;
    let categoryId: number = typeof category === 'number' ? category : category.id;

    let cacheResult = this.mostPopularOfCategory.get(categoryId);
    if(cacheResult != undefined)
      return cacheResult;

    return this.relatedItemsApi.getMostPopularByPlaceAndCategory(placeId, categoryId)
      .then( (res: JSON[]) => {
        let result = new ItemsList(res);
        this.mostPopularOfCategory.set(categoryId, result);
        return result;
      } )
      .catch( (e: HttpErrorResponse) => {
        throw new ErrorMessage(e.message);
      })

  }

}

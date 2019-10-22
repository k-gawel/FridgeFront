import {Injectable} from '@angular/core';
import {RelatedItemsApiService} from '../../../api/item/related-items-api.service';
import {Place} from '../../../../_models/response/Place';
import {Category} from '../../../../_models/response/Category';
import {ItemsList} from '../../../../_models/response/item/ItemsList';

@Injectable({
  providedIn: 'root'
})
export class RelatedItemsService {

  constructor(private relatedItemsApi: RelatedItemsApiService) { }

  mostPopularOfCategory: Map<number, ItemsList> = new Map<number, ItemsList>();
  allOfCategory: Map<number, ItemsList> = new Map<number, ItemsList>();


  public async getMostPopular(category: Category | number, place: Place | number): Promise<ItemsList> {
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
      });
  }


  public async getAll(categoryID: number, placeID: number): Promise<ItemsList> {
    let cacheResult = this.allOfCategory.get(categoryID);
    if(cacheResult != undefined)
      return cacheResult;

    return this.relatedItemsApi.getAll(placeID, categoryID)
      .then((res: JSON[]) => {
        let result = new ItemsList(res);
        this.allOfCategory.set(categoryID, result);
        return result;
      })

  }
}

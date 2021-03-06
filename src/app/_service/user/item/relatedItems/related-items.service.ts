import {Injectable} from '@angular/core';
import {RelatedItemsApiService} from '../../../api/item/related-items-api.service';
import {PlaceDetails} from '../../../../_models/response/PlaceDetails';
import {Category} from '../../../../_models/response/Category';
import {ItemsList} from '../../../../_models/response/item/ItemsList';
import {HttpErrorResponse} from '@angular/common/http';
import {ErrorMessage} from '../../../../_models/util/ErrorMessage';
import {IdSelector} from "../../../utils/EntitySelector";

@Injectable({
  providedIn: 'root'
})
export class RelatedItemsService {

  constructor(private relatedItemsApi: RelatedItemsApiService) { }

  mostPopularOfCategory: Map<number, ItemsList> = new Map<number, ItemsList>();
  allOfCategory: Map<number, ItemsList> = new Map<number, ItemsList>();


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
        throw new ErrorMessage(e);
      } );
  }


  public async getAll(category: IdSelector, place: IdSelector, limit: number): Promise<ItemsList> {
    let categoryID: number = category.id[0];
    let placeID: number = place.id[0];

    let cacheResult = this.allOfCategory.get(categoryID);
    if(cacheResult != undefined)
      return cacheResult;

    return this.relatedItemsApi.getAll(placeID, categoryID)
      .then((res: JSON[]) => {
        let result = new ItemsList(res);
        this.allOfCategory.set(categoryID, result);
        return result;
      })
      .catch((e: HttpErrorResponse) => { throw new ErrorMessage(e); });
  }
}

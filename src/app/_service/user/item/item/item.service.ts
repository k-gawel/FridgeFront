import {Injectable} from '@angular/core';
import {ItemApiService} from '../../../api/item/item-api.service';
import {Item} from '../../../../_models/response/item/Item';
import {Category} from '../../../../_models/response/Category';
import {PlaceDetails} from '../../../../_models/response/PlaceDetails';
import {ItemForm} from '../../../../_models/request/item/ItemForm';
import {IdSelector} from '../../../utils/EntitySelector';
import {ItemsList} from '../../../../_models/response/item/ItemsList';
import {ErrorHandlerService} from "../../../utils/errorhanler/error-handler.service";

@Injectable({
  providedIn: 'root'
})
export class  ItemService {

  public items: ItemsList = new ItemsList();
  private cacheResults: Map<string, ItemsList> = new Map<any, ItemsList>();

  constructor(private itemApi: ItemApiService,
              private errorHandler: ErrorHandlerService) {
  }


  public newItem(form: ItemForm): Promise<Item | ItemForm> {
    return this.itemApi.newItem(form)
      .then((response: JSON) => new Item(response) )
      .catch(e => this.errorHandler.processFormError(form, e) );
  }


  public async getItemsByIds(ids: number[], refresh?: boolean): Promise<ItemsList> {
    let result: ItemsList = new ItemsList();
    let idsToFind = this.getIdsToFind(ids, result, refresh);

    if(idsToFind.length != 0) {
      let query = new ItemQuery(this.itemApi);
      query.itemIds = idsToFind;
      await query.execute()
        .then((r: JSON[]) => {
          return new ItemsList(r);
        })
        .then(r => <ItemsList> result.addAll(r));
    }


    return result;
  }


  public searchItemsByBarcode(barcode: number, place?: PlaceDetails): Promise<ItemsList> {
    let query = new ItemQuery(this.itemApi);
    query.barcode = barcode;

    if(place != undefined)
      query.placeIds = place.id;

    return query.execute()
                .then((response: JSON[]) => new ItemsList(response) )
                .catch(e => new ItemsList() );
  }


  public async searchItemByName(name: string, place?: PlaceDetails | PlaceDetails[] | number | number[], category?: Category): Promise<ItemsList> {
    let query = new ItemQuery(this.itemApi);
    query.name = name;
    if(place !== undefined)
      query.placeIds = (new IdSelector(place)).id;
    if(category !== undefined)
      query.categoryId = category.id;


    let cacheResult = this.cacheResults.get(query.asKey());
    if(cacheResult != undefined)
      return cacheResult;

    return query.execute().then(
      (response: JSON[]) => {
        let result = new ItemsList(response);
        this.cacheResults.set(query.asKey(), result);
        return result;
      }
    )

  }


  public async getByCategory(category: IdSelector, place?: IdSelector, limit?: number): Promise<ItemsList> {

    let query = new ItemQuery(this.itemApi);
    query.categoryId = category.id[0];
    if (place != undefined)
      query.placeIds = place.id;


    let cacheResult = this.cacheResults.get(query.asKey());
    if (cacheResult != undefined)
      return cacheResult;


    return query.execute()
                .then((response: JSON[]) => {
                  let result = new ItemsList(response);
                  this.cacheResults.set(query.asKey(), result);
                  return result;
                });

  }


  private getIdsToFind(ids: number[], result: ItemsList, refresh?: boolean): number[] {
    if(refresh == true) return ids;

    let resultIds = [];

    for (let id of ids) {
      let item = ItemsList.ALL[id];
      if (item == null) resultIds.push(id);
      else              result.add(item);
    }

    return resultIds;
  }


}

export class ItemQuery {

  private _itemIds: number | number[] = null;
  private _placeIds: number | number[] = null;
  private _name: string = null;
  private _barcode: number = null;
  private _categoryId: number = null;

  public asKey(): string {
    return 'placeIds' + this._placeIds + 'itemIds' + this._itemIds + "name" + this._name
      + 'barcode' + this._categoryId + 'categoryId' + this._categoryId;
  }

  execute() {
    return this.itemApi.search(this._itemIds, this._placeIds, this._name, this._barcode, this._categoryId);
  }

  constructor(private itemApi: ItemApiService) {
  }

  get itemIds(): number | number[] {
    return this._itemIds;
  }

  set itemIds(value: number | number[]) {
    this._itemIds = value;
  }

  get placeIds(): number | number[] {
    return this._placeIds;
  }

  set placeIds(value: number | number[]) {
    this._placeIds = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get barcode(): number {
    return this._barcode;
  }

  set barcode(value: number) {
    this._barcode = value;
  }

  get categoryId(): number {
    return this._categoryId;
  }

  set categoryId(value: number) {
    this._categoryId = value;
  }
}

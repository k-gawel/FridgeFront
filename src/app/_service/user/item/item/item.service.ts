import {Injectable} from '@angular/core';
import {ItemApiService} from '../../../api/item/item-api.service';
import {Item} from '../../../../_models/response/item/Item';
import {HttpErrorResponse} from '@angular/common/http';
import {Category} from '../../../../_models/response/Category';
import {PlaceDetails} from '../../../../_models/response/PlaceDetails';
import {ErrorMessage} from '../../../../_models/util/ErrorMessage';
import {ItemForm} from '../../../../_models/request/ItemForm';
import {IdSelector} from '../../../utils/EntitySelector';
import {ItemsList} from '../../../../_models/response/item/ItemsList';

@Injectable({
  providedIn: 'root'
})
export class  ItemService {

  public items: ItemsList = new ItemsList();
  private cacheResults: Map<string, ItemsList> = new Map<any, ItemsList>();

  constructor(private itemApi: ItemApiService) { }


  public newItem(form: ItemForm): Promise<Item> {

    if(!form.validate())
      throw form.errors;

    return this.itemApi.newItem(form)
      .then((response: JSON) => { return new Item(response); })
      .catch((error: HttpErrorResponse) => { throw new ErrorMessage(error.message) } );

  }


  public async getItemById(id: number, refresh?: boolean): Promise<Item | ErrorMessage> {

    let result: Item | ErrorMessage = null;

    if(!refresh)
      result = ItemsList.ALL[id];

    if(result === null) {

      let query = new ItemQuery(this.itemApi);
      query.itemIds = id;

      await query.execute()
        .then((response: JSON[]) => {
          result = new Item(response[0]);
        }).catch( (e: Error) => {
          if(e instanceof HttpErrorResponse) {
            throw new ErrorMessage(e.message)
          } else {
            console.error(e);
            return null;
          }
        })

    }

    return result;

  }


  public async getItemsByIds(ids: number[], refresh?: boolean): Promise<ItemsList> {
    let result: ItemsList = new ItemsList();
    let idsToFind: number[] = [];
    idsToFind = idsToFind.concat(ids);

    if(!refresh) {
      for(let id of ids) {
        let item = ItemsList.ALL[id];
        if(item != null) {
          result.add(item);
          idsToFind.splice(idsToFind.indexOf(id), 1);
        }
      }
    }

    if(idsToFind.length != 0) {
      let query = new ItemQuery(this.itemApi);
      query.itemIds = idsToFind;
      await query.execute()
        .then((r: JSON[]) => new ItemsList(r))
        .then(r => <ItemsList> result.addAll(r))
    }

    return result;
  }


  public searchItemsByBarcode(barcode: number, place?: PlaceDetails): Promise<ItemsList> {

    let result: ItemsList | ErrorMessage;

    let query = new ItemQuery(this.itemApi);
    query.barcode = barcode;
    if(place != undefined)
      query.placeIds = place.id;

    return query.execute().then(
      (response: JSON[]) => {
        return new ItemsList(response);
      },
      (error: HttpErrorResponse) => {
        if(error.status === 400) {
          return new ItemsList();
        } else {
          throw new ErrorMessage(error.message);
        }
      }
    );

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
      },
      (error: HttpErrorResponse) => {
        throw new ErrorMessage(error.message);
      }
    );

  }


  public async getByCategory(category: IdSelector, place?: IdSelector, limit?: number): Promise<ItemsList> {

    let query = new ItemQuery(this.itemApi);
    query.categoryId = category.id[0];
    if(place != undefined)
      query.placeIds = place.id;


    let cacheResult = this.cacheResults.get(query.asKey());
    if(cacheResult != undefined)
      return cacheResult;


    return query.execute()
      .then((response: JSON[]) => {
          let result = new ItemsList(response);
          this.cacheResults.set(query.asKey(), result);
          return result;
      })
      .catch((e: HttpErrorResponse) => {
        throw new ErrorMessage(e.message);
      });

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

import {Injectable} from '@angular/core';
import {ItemInstanceApiService} from '../../api/item/item-instance-api.service';
import {ItemInstance} from '../../../_models/request/item/ItemInstance';
import {ErrorMessage} from '../../../_models/util/ErrorMessage';
import {HttpErrorResponse} from '@angular/common/http';
import {Entity} from '../../../_models/request/Entity';
import {IdSelector} from '../../utils/EntitySelector';
import {CookieDataService} from '../../auth/cookieDatas/cookie-datas.service';
import {ItemInstanceForm} from '../../../_models/response/ItemInstanceForm';
import {ItemInstancesList} from '../../../_models/request/item/ItemInstancesLst';
import {Subject} from 'rxjs/Subject';
import {LocalDate} from '../../../_util/date/JavaLocalDate';

@Injectable({
  providedIn: 'root'
})
export class InstanceService {


  public $deletedInstance = new Subject<ItemInstance>();

  constructor(private instanceApi: ItemInstanceApiService,
              private cookieDatas: CookieDataService) {
  }

  public addInstance(form: ItemInstanceForm): Promise<ItemInstance> {

    if(!form.validate())
      throw form.errors;

    return this.instanceApi.newItemInstance(form)
      .then((res: JSON) => {
        return new ItemInstance(res);
      })
      .catch((error: HttpErrorResponse) => {
        throw new ErrorMessage(error.message);
      })

  }

  public async get(query: ItemInstanceQuery, list?: ItemInstancesList): Promise<ItemInstancesList> {

    let result: ItemInstancesList;
    result = new ItemInstancesList();
    query.api = this.instanceApi;

    if(list != undefined) {

      result.pushAll(list);

      if(query.open != undefined)
        result = result.filtrByOpen(<boolean> query.open);
      if(query.deleted != undefined)
        result = result.filtrByDeleted(<boolean> query.deleted);
      if(query.containers != undefined)
        result = result.getByContainers(query.containers);
      if(query.items != undefined)
        result = result.getByItems(query.items);
      if(query.owners != undefined)
        result = result.getByOwners(query.owners);

    } else {
      await query.execute()
        .then((response: JSON[]) => {
          result = new ItemInstancesList(response);
        })
        .catch((e: HttpErrorResponse) => {
          throw new ErrorMessage(e.message);
        })
    }

    return result;
  }

  public async getById(id: number, refresh?: boolean): Promise<ItemInstance | ErrorMessage> {
    let result: ItemInstance | ErrorMessage = null;

    if(!refresh) {
      result = ItemInstancesList.getById(id);
    }

    if(result === null) {
      let query = new ItemInstanceQuery(this.instanceApi);
      query.ids = id;
      await query.execute().then(
        (response: JSON) => {
          result = new ItemInstance(response);
        },
        (error: HttpErrorResponse) => {
          throw new ErrorMessage(error.message);
        }
      )
    }

    return result;
  }

  public async getBydIds(ids: number[], refresh?: boolean): Promise<ItemInstancesList | ErrorMessage> {
    let result: ItemInstancesList | ErrorMessage = new ItemInstancesList();
    let idsToFind: number[] = [];
    idsToFind.concat(ids);

    if(!refresh) {
      for(let singleId of ids) {
        let instance = ItemInstancesList.getById(singleId);
        if(instance != null) {
          idsToFind.splice(idsToFind.indexOf(singleId), 1);
          result.push(instance);
        }
      }
    }

    if(idsToFind.length !== 0) {

      let query = new ItemInstanceQuery(this.instanceApi);
      query.ids = idsToFind;
      await query.execute().then(
        (response: JSON[]) => {
          if(result instanceof ItemInstancesList)
            result.pushAll(new ItemInstancesList(response));
        },
        (error: HttpErrorResponse) => {
          throw new ErrorMessage(error.message);
        }
      )

    }

    return result;

  }

  public async getByItemsAndPlaces(items: IdSelector, places: IdSelector): Promise<ItemInstancesList | ErrorMessage> {
    let query = new ItemInstanceQuery(this.instanceApi);
    query.items = items.id;
    query.places = places.id;

    let result: ItemInstancesList | ErrorMessage;

    await query.execute().then(
      (response: JSON[]) => {
        result = new ItemInstancesList(response);
      },
      (error: HttpErrorResponse) => {
        throw new ErrorMessage(error.message);
      }
    );

    return result;
  }

  private async updateInstance(instanceId: number, method: string): Promise<Boolean | ErrorMessage> {
    let result: Boolean | ErrorMessage;

    let _delete: Boolean = method === 'delete';
    let _open: Boolean = method === 'open';
    let _frozeOrUnfroze = method === 'frozeOrUnfroze';

    await this.instanceApi.update(instanceId, _delete, _open, _frozeOrUnfroze).then(
      (response: Boolean) => {
        result = response;
      },
      (error: HttpErrorResponse) => {
        throw new ErrorMessage(error.message);
      }
    );

    return result;

  }

  public deleteInstance(instance: Entity | number) {
    let instanceEntity: ItemInstance = typeof instance === 'number' ? ItemInstancesList.getById(instance) : <ItemInstance> instance;
    return this.updateInstance(instanceEntity.id, 'delete').then(
      (result: Boolean) => {
        if(result) {
          instanceEntity.deletedById = this.cookieDatas.getUserId();
          instanceEntity.deletedOn = new LocalDate();
          this.$deletedInstance.next(instanceEntity);
        } else {
          throw new ErrorMessage("instancedelete.unable");
        }
      },
      (error: ErrorMessage) => {
        throw error;
      }
    )
  }

  public openInstance(instance: Entity | number) {
    let instanceEntity: ItemInstance = typeof instance === 'number' ? ItemInstancesList.getById(instance) : <ItemInstance> instance;

    return this.updateInstance(instanceEntity.id, 'open')
      .then((result: Boolean) => {
        if(result) {
          instanceEntity.openById = this.cookieDatas.getUserId();
          instanceEntity.openOn = new LocalDate();
        }
        else throw new ErrorMessage("instanceopen.unable");
        }
       )
      .catch((error: ErrorMessage) => {
        throw error;
      });
  }

  public frozeOrUnfrozeInstance(instance: Entity | number) {
    let instanceEntity: ItemInstance = typeof instance === 'number' ? ItemInstancesList.getById(instance) : <ItemInstance> instance;
    return this.updateInstance(instanceEntity.id, 'frozeOrUnfroze')
      .then((result: Boolean) => {
        if(result) {
        } else throw new ErrorMessage("instancefrozeorunfroze.unable")
      } )
      .catch((error: ErrorMessage) => {
        throw error;
      });
  }



}

export class ItemInstanceQuery {

  private _ids: number | number[] = [];
  private _items: number | number[] = [];
  private _places: number | number[] = [];
  private _containers: number | number[] = [];
  private _owners: number | number[] = [];
  private _deleted: Boolean = null;
  private _open: Boolean = null;
  private _frozen: Boolean = null;
  private _limit: Number = null;

  api: ItemInstanceApiService;

  constructor(api?: ItemInstanceApiService) {
    this.api = api;
  }

  execute() {
    return this.api.get(this._ids, this._items, this._places, this._containers,
                        this._owners, this._deleted, this._open, this._frozen, this._limit)
  }

  get ids(): number | number[] {
    return this._ids;
  }

  set ids(value: number | number[]) {
    this._ids = value;
  }

  get items(): number | number[] {
    return this._items;
  }

  set items(value: number | number[]) {
    this._items = value;
  }

  get places(): number | number[] {
    return this._places;
  }

  set places(value: number | number[]) {
    this._places = value;
  }

  get containers(): number | number[] {
    return this._containers;
  }

  set containers(value: number | number[]) {
    this._containers = value;
  }

  get owners(): number | number[] {
    return this._owners;
  }

  set owners(value: number | number[]) {
    this._owners = value;
  }

  get deleted(): Boolean {
    return this._deleted;
  }

  set deleted(value: Boolean) {
    this._deleted = value;
  }

  get open(): Boolean {
    return this._open;
  }

  set open(value: Boolean) {
    this._open = value;
  }

  get frozen(): Boolean {
    return this._frozen;
  }

  set frozen(value: Boolean) {
    this._frozen = value;
  }

  get limit(): Number {
    return this._limit;
  }

  set limit(value: Number) {
    this._limit = value;
  }
}

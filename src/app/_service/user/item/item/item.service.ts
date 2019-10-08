import {Injectable} from '@angular/core';
import {ItemApiService} from '../../../api/item/item-api.service';
import {Item} from '../../../../_models/response/item/Item';
import {ItemForm} from '../../../../_models/request/item/ItemForm';
import {ItemsList} from '../../../../_models/response/item/ItemsList';
import {ErrorHandlerService} from "../../../utils/errorhanler/error-handler.service";
import {ItemGetQuery} from "../../../../_models/request/item/ItemGetQuery";

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



  public get(query: ItemGetQuery): Promise<ItemsList> {
    return this.itemApi.search(query)
                       .then((r: JSON[]) => new ItemsList(r));
  }


  public async getItemsByIds(ids: number[], refresh?: boolean): Promise<ItemsList> {
    let result: ItemsList = new ItemsList();
    let idsToFind = this.getIdsToFind(ids, result, refresh);

    if(idsToFind.length != 0) {
      let query = new ItemGetQuery();
      query.items = idsToFind;
      await this.itemApi.search(query)
                        .then((r: JSON[]) => new ItemsList(r) )
                        .then(r => <ItemsList> result.addAll(r));
    }

    return result;
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

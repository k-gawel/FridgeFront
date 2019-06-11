import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { ItemInstanceForm } from '../../../_models/response/ItemInstanceForm';
import { ItemInstance } from '../../../_models/request/item/ItemInstance';
import {HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ItemInstanceApiService {

  private url = this.api.url + "itemInstance/";

  constructor(private api: ApiService) { }

  public newItemInstance(form: ItemInstanceForm) {
    let url = this.url + "new";
    let body = form;
    let header = this.api.getHeaderWithToken();

    return this.api.post(url, body, header);
  }

  public get(ids: number | number[], items: number | number[], places: number | number[],
             containers: number | number[], owners: number | number[], deleted: Boolean,
             open: Boolean, frozen: Boolean, limit: Number) {

    let idsString = ApiService.numbersArrayToString(ids);
    let itemsString = ApiService.numbersArrayToString(items);
    let placesString = ApiService.numbersArrayToString(places);
    let containersString = ApiService.numbersArrayToString(containers);
    let ownersString = ApiService.numbersArrayToString(owners);

    let url = this.url + "get";
    let params = new HttpParams();
    if(idsString != '')
      params = params.append("ids", idsString);
    if(itemsString != '')
      params = params.append("items", itemsString);
    if(placesString != '')
      params = params.append("places", placesString);
    if(containersString != '')
      params = params.append("containers", containersString);
    if(ownersString != '')
      params = params.append("owners", ownersString);
    if(deleted != null)
      params = params.append("deleted", deleted.toString());
    if(open != null)
      params = params.append("open", open.toString());
    if(frozen != null)
      params = params.append("frozen", frozen.toString());
    if(limit != null)
      params = params.append("limit", limit.toString());

    let header = this.api.getHeaderWithToken();

    return this.api.get(url, header, params);
  }

  public update(instanceId: number, _delete: Boolean, open: Boolean, frozenOrUnfroze: Boolean) {

    let url = this.url + "update/" + instanceId;
    let header = this.api.getHeaderWithToken();
    let params = new HttpParams();
    if(_delete != null)
      params = params.append("delete", _delete.toString());
    if(open != null)
      params = params.append("open", open.toString());
    if(frozenOrUnfroze != null)
      params = params.append("frozeOrUnfroze", frozenOrUnfroze.toString());

    return this.api.put(url, params, null, header);
  }




}

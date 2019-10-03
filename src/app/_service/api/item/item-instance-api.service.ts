import {Injectable} from '@angular/core';
import {ApiService} from '../api/api.service';
import {ItemInstanceForm} from '../../../_models/request/iteminstance/ItemInstanceForm';
import {HttpParams} from '@angular/common/http';
import {ItemInstanceQuery} from "../../../_models/request/iteminstance/ItemInstanceQuery";

@Injectable({
  providedIn: 'root'
})
export class ItemInstanceApiService {

  private url = this.api.url + "itemInstances";

  constructor(private api: ApiService) { }

  public newItemInstance(form: ItemInstanceForm) {
    let url = this.url;
    let body = form;
    let header = this.api.getHeaderWithToken();

    return this.api.post(url, body, header);
  }


  public get(query: ItemInstanceQuery) {
    let url = this.url;
    let header = this.api.getHeaderWithToken();
    let params = query.toHttpParams();

    return this.api.get(url, header, params);
  }


  public update(instanceId: number, _delete: Boolean, open: Boolean, frozenOrUnfroze: Boolean) {
    let url = this.url + "/" + instanceId;
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

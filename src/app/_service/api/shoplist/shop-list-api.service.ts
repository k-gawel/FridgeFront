import {Injectable} from '@angular/core';
import {ApiService} from "../api/api.service";
import {ShopListForm} from "../../../_models/request/ShopListForm";

@Injectable({
  providedIn: 'root'
})
export class ShopListApiService extends ApiService {

  public surl = this.url + "shoplists/";


  public create(form: ShopListForm) {
    let url = this.surl;
    let body = form;
    let headers = this.getHeaderWithToken();

    return this.post(url, body, headers);
  }


  public addInstance(shopListId: number, instanceId: number) {
    let url = this.surl + shopListId + "/instances/" + instanceId;
    let headers = this.getHeaderWithToken();

    return this.post(url, null, headers);
  }


  public deleteInstance(shopListId: number, instanceId: number) {
    let url = this.surl + shopListId + "/instances/" + instanceId;
    let headers = this.getHeaderWithToken();

    return this.delete(url, null);
  }


}

import {Injectable} from '@angular/core';
import {ShopListApiService} from "../../api/shoplist/shop-list-api.service";
import {ShopList} from "../../../_models/response/ShopList";
import {ShopListForm} from "../../../_models/request/ShopListForm";
import {HttpErrorResponse} from "@angular/common/http";
import {ItemInstance} from "../../../_models/response/item/ItemInstance";

@Injectable({
  providedIn: 'root'
})
export class ShopListService {

  constructor(private api: ShopListApiService) {
  }


  public create(form: ShopListForm): Promise<ShopList | ShopListForm> {
    return this.api.create(form)
      .then((j: JSON) => new ShopList(j))
      .catch((e: HttpErrorResponse) => this.manageFormErrors(form, e));
  }


  private manageFormErrors(form: ShopListForm, e: HttpErrorResponse): ShopListForm {
    return form;
  }


  public addInstance(shopList: ShopList, itemInstance: ItemInstance): void {
    this.api.addInstance(shopList.id, itemInstance.id).catch(e => console.log(e));
  }


  public removeInstance(shopList: ShopList, itemInstance: ItemInstance): void {
    this.api.deleteInstance(shopList.id, itemInstance.id).catch(e => console.log(e));
  }


}

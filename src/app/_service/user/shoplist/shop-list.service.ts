import {Injectable} from '@angular/core';
import {ShopListApiService} from "../../api/shoplist/shop-list-api.service";
import {ShopList, ShopListList} from "../../../_models/response/ShopList";
import {ShopListForm} from "../../../_models/request/shoplist/ShopListForm";
import {HttpErrorResponse} from "@angular/common/http";
import {ItemInstance} from "../../../_models/response/item/ItemInstance";
import {ErrorHandlerService} from "../../utils/errorhanler/error-handler.service";
import {ShopListQuery} from "../../../_models/request/wishlist/ShopListQuery";
import {Item} from "../../../_models/response/item/Item";

@Injectable({
  providedIn: 'root'
})
export class ShopListService {

  constructor(private api: ShopListApiService,
              private errorHandler: ErrorHandlerService) {
  }


  public get(query: ShopListQuery): Promise<ShopListList> {
    let processResult = (r: JSON) => {
      (<JSON[]> r['items']).forEach(j => Item.parse(j));
      (<JSON[]> r['instances']).forEach(j => ItemInstance.parse(j));
      return new ShopListList(r['shopLists']);
    };

    return this.api.getShopList(query).then(processResult);
  }


  public create(form: ShopListForm): Promise<ShopList> {
    return this.api.create(form)
      .then((j: JSON) => new ShopList(j))
      .catch((e: HttpErrorResponse) => this.errorHandler.processFormError(form, e));
  }


  public archive(shopList: ShopList): Promise<boolean> {
    let manageResult = (res: boolean) => {
      if(res)
        shopList.status = false;
      return res;
    };

    let manageError = (e: HttpErrorResponse) => {
      console.log(e);
      return false;
    };

    return this.api.archive(shopList.id)
                   .then(manageResult)
                   .catch(manageError);
  }


  public addInstance(shopList: ShopList, itemInstance: ItemInstance): Promise<boolean> {
    let manageResult = (r: boolean) => {
      if(r)
        shopList.addNewInstance(itemInstance);
      return r;
    };

    let manageError = (e: HttpErrorResponse) => {
      return false;
    };

    return this.api.addInstance(shopList.id, itemInstance.id)
               .then(manageResult)
               .catch(manageError);
  }


  public removeInstance(shopList: ShopList, itemInstance: ItemInstance): void {
    this.api.deleteInstance(shopList.id, itemInstance.id).catch(e => console.log(e));
  }



}

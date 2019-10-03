import {Injectable} from '@angular/core';
import {ItemInstanceApiService} from '../../api/item/item-instance-api.service';
import {ItemInstance} from '../../../_models/response/item/ItemInstance';
import {CookieDataService} from '../../auth/cookieDatas/cookie-datas.service';
import {ItemInstanceForm} from '../../../_models/request/iteminstance/ItemInstanceForm';
import {ItemInstancesList} from '../../../_models/response/item/ItemInstancesList';
import {LocalDate} from '../../../_util/date/JavaLocalDate';
import {UserDate} from "../../../_models/util/UserDate";
import {ErrorHandlerService} from "../../utils/errorhanler/error-handler.service";
import {ItemInstanceQuery} from "../../../_models/request/iteminstance/ItemInstanceQuery";

@Injectable({
  providedIn: 'root'
})
export class ItemInstanceService {


  constructor(private instanceApi: ItemInstanceApiService,
              private cookieDatas: CookieDataService,
              private errorHandler: ErrorHandlerService) {
  }


  public get(query: ItemInstanceQuery): Promise<ItemInstancesList> {
    let processResult = (r: JSON[]) => {
      return new ItemInstancesList(r);
    };

    return this.instanceApi.get(query)
      .then(processResult);
  }


  public addInstance(form: ItemInstanceForm): Promise<ItemInstance> {
    return this.instanceApi.newItemInstance(form)
      .then((res: JSON) => new ItemInstance(res))
      .catch(e => this.errorHandler.processFormError(form, e));
  }


  private updateInstance(instanceId: number, method: string): Promise<boolean> {
    let _delete: Boolean = method === 'delete';
    let _open: Boolean   = method === 'open';
    let _frozeOrUnfroze  = method === 'frozeOrUnfroze';

    return this.instanceApi.update(instanceId, _delete, _open, _frozeOrUnfroze)
                           .then((r: boolean) => r);
  }


  public deleteInstance(instance: ItemInstance) {
    let processResult = (r: boolean) => {
      if (r)
        instance.deleted = new UserDate(this.cookieDatas.getUserId());
      return r;
    };

    return this.updateInstance(instance.id, 'delete').then(processResult)
  }


  public openInstance(instance: ItemInstance) {
    let processResult = (r: boolean) => {
      if (r)
        instance.opened = new UserDate(this.cookieDatas.getUserId(), new LocalDate());
      return r;
    };

    return this.updateInstance(instance.id, 'open')
               .then(processResult);
  }


  public frozeOrUnfrozeInstance(instance: ItemInstance) {
    let processResult = (r: boolean) => {
    };

    return this.updateInstance(instance.id, 'frozeOrUnfroze')
               .then(processResult);
  }

}

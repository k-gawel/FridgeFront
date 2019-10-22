import {Injectable} from '@angular/core';
import {WishListItemApiService} from '../../../api/wishlist/wish-list-item-api.service';
import {ItemService} from '../../item/item/item.service';
import {WishListItem} from '../../../../_models/response/WishListItem';
import {ItemInstanceService} from '../../instance/item-instance.service';
import {ErrorHandlerService} from '../../../utils/errorhanler/error-handler.service';
import {ErrorMessage} from '../../../../_models/util/ErrorMessage';
import {WishListItemForm} from '../../../../_models/request/wishlistitem/WishListItemForm';
import {HttpErrorResponse} from '@angular/common/http';
import {SessionService} from '../../../auth/cookieDatas/cookie-datas.service';
import {ItemInstance} from '../../../../_models/response/item/ItemInstance';
import {UserDate} from "../../../../_models/util/UserDate";

@Injectable({
  providedIn: 'root'
})
export class WishListItemService {

  constructor(private wishListItemApi: WishListItemApiService,
              private cookiesData: SessionService,
              private itemService: ItemService,
              private itemInstanceService: ItemInstanceService,
              private errorHandler: ErrorHandlerService) { }


  public newItem(form: WishListItemForm): Promise<WishListItem> {
    return this.wishListItemApi.newItem(form)
      .then((res: JSON) => new WishListItem(res) )
      .catch(e => this.errorHandler.processFormError(form, e) );
  }


  public addInstance(item: WishListItem, instance: ItemInstance): Promise<boolean> {
    return this.wishListItemApi.addInstance(item.id, instance.id)
      .then((response: boolean) => {
        if(response) {
          item.added = new UserDate(this.cookiesData.getUserId());
          instance.wishListItem = item;
          item.addedInstance = instance;
        }
        return response;
      })
      .catch((error: HttpErrorResponse) => {
        this.errorHandler.sendErrors(new ErrorMessage(error.message));
        return false;
      });

  }

}


import {Injectable} from '@angular/core';
import {WishListItemApiService} from '../../../../api/wishlist/wish-list-item-api.service';
import {ItemService} from '../../../item/item/item.service';
import {WishListItem} from '../../../../../_models/response/WishListItem';
import {UserDetailsList} from '../../../../../_models/response/UserDetails';
import {KeyName} from '../../../../../_models/response/KeyName';
import {Category} from '../../../../../_models/response/Category';
import {InstanceService} from '../../../instance/instance.service';
import {Item} from '../../../../../_models/response/item/Item';
import {ErrorHandlerService} from '../../../../utils/errorhanler/error-handler.service';
import {ErrorMessage} from '../../../../../_models/util/ErrorMessage';
import {WishListItemForm} from '../../../../../_models/request/WishListItemForm';
import {ItemInstanceForm} from '../../../../../_models/request/ItemInstanceForm';
import {HttpErrorResponse} from '@angular/common/http';
import {CookieDataService} from '../../../../auth/cookieDatas/cookie-datas.service';
import {ItemInstance} from '../../../../../_models/response/item/ItemInstance';
import {PlaceUsersList} from '../../../../../_models/response/place-user/PlaceUsersList';
import {WishListService} from '../wishlist/wish-list.service';

@Injectable({
  providedIn: 'root'
})
export class WishListItemService {

  constructor(private wishListItemApi: WishListItemApiService,
              private wishListService: WishListService,
              private cookiesData: CookieDataService,
              private itemService: ItemService,
              private itemInstanceService: InstanceService,
              private errorHandler: ErrorHandlerService) { }


  public async get(wishListItem: WishListItem | number): Promise<WishListItem> {
    let result: WishListItem;

    if(typeof wishListItem === 'number')
      await this.wishListItemApi.get(wishListItem)
        .then((res: JSON) => {
          result = new WishListItem(res);
        } )
        .catch((error: ErrorMessage) => {
          this.errorHandler.sendErrors(error);
        });
    else
      result = wishListItem;

    if (typeof result.author === 'number')
      result.author = <KeyName> PlaceUsersList.ALL.getById(result.author);

    if (typeof result.item === 'number')
      await this.itemService.getItemById(result.item)
        .then((res: Item) => {
          result.item = res;
        })
        .catch((error: Error) => {
          this.errorHandler.sendErrors(error)
        });

    if (typeof result.category === 'number')
      result.category = Category.getById(result.category);

    if (typeof result.addedInstance === 'number')
      await this.itemInstanceService.getById(result.addedInstance)
        .then((res: ItemInstance) => {
          result.addedInstance = res
        })
        .catch((error: Error) => {
          this.errorHandler.sendErrors(error)
        });

    if (typeof result.addedBy === 'number')
      result.addedBy = <KeyName> UserDetailsList.USERS.getById(result.addedBy);

    if (typeof result.wishList === 'number')
      result.wishList = await this.wishListService.getWishList(result.wishList);

    return <WishListItem> result;
  }


  public newItem(form: WishListItemForm): Promise<WishListItem> {

    if(!form.validate())
      throw form.errors;

    return this.wishListItemApi.newItem(form)
      .then((res: JSON) => {
        if(res == null)
          throw new ErrorMessage("newwishlistitem.error");
        else {
          let result = new WishListItem(res);
          return this.get(result);
        }
      })
      .catch((error: Error) => {
        if(error instanceof ErrorMessage)
          throw error;
        throw new ErrorMessage(error.message);
      } );

  }


  public async addInstance(item: WishListItem, instance: ItemInstance) {
    return this.wishListItemApi.addInstance(item.id, instance.id)
      .then((response: JSON) => {
        item.addedInstance = instance;
      })
      .catch((error: HttpErrorResponse) => this.errorHandler.sendErrors(new ErrorMessage(error.message)) );

  }

}


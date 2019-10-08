import {Injectable} from '@angular/core';
import {WishListApiService} from '../../../api/wishlist/wish-list-api.service';
import {PlaceDetails} from '../../../../_models/response/PlaceDetails';
import {WishList, WishListList} from '../../../../_models/response/WishList';
import {WishListForm} from '../../../../_models/request/wishlist/WishListForm';
import {ErrorMessage} from '../../../../_models/util/ErrorMessage';
import {HttpErrorResponse} from '@angular/common/http';
import {WishListItemService} from "../wishListItem/wish-list-item.service";
import {ErrorHandlerService} from "../../../utils/errorhanler/error-handler.service";
import {OffsetLimit} from "../../../../_util/OffsetLimit";
import {ItemsList} from "../../../../_models/response/item/ItemsList";
import {Item} from "../../../../_models/response/item/Item";
import {ItemInstance} from "../../../../_models/response/item/ItemInstance";

@Injectable({
  providedIn: 'root'
})
export class WishListService {

  constructor(private wishListApiServcie: WishListApiService,
              private errorHandler: ErrorHandlerService) {
  }


  public get(query: WishListQuery): Promise<WishListList> {
    let processResult = (r: JSON) => {
      r['items'].forEach(j => Item.parse(j));
      r['instances'].forEach(j => ItemInstance.parse(j));
      return new WishListList(r['wishLists']);
    };

    query.api = this.wishListApiServcie;
    return query.execute().then(processResult);
  }


  public addNew(form: WishListForm): Promise<WishList> {
    return this.wishListApiServcie.newWishList(form)
      .then((response: JSON) => new WishList(response) )
      .catch(e => this.errorHandler.processFormError(form, e) );
  }


  public archive(wishList: WishList): Promise<Boolean> {
    let processResult = (r: boolean) => {
      if(r) wishList.status = false;
      return r;
    };

    return this.wishListApiServcie.archive(wishList.id)
                                  .then(processResult);
  }


}


export class WishListQuery {

  private _ids: number[] = null;
  private _placeIds: number[] = [];
  private _active: Boolean = null;
  private _offsetLimit: OffsetLimit = null;
  private _api: WishListApiService;

  public execute() {
    if(this._api == null)
      throw new Error("Api is undefined.");
    return this._api.get(this._placeIds, this._ids, this._active, this._offsetLimit);
  }

  get ids(): number[] {
    return this._ids;
  }

  set ids(value: number[]) {
    this._ids = value;
  }

  get placeIds(): number[] {
    return this._placeIds;
  }

  set placeIds(value: number[]) {
    this._placeIds = value;
  }

  get active(): Boolean {
    return this._active;
  }

  set active(value: Boolean) {
    this._active = value;
  }

  get offsetLimit(): OffsetLimit {
    return this._offsetLimit;
  }

  set offsetLimit(value: OffsetLimit) {
    this._offsetLimit = value;
  }

  set api(value: WishListApiService) {
    this._api = value;
  }

}

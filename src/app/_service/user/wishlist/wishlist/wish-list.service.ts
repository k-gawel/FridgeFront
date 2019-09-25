import {Injectable} from '@angular/core';
import {WishListApiService} from '../../../api/wishlist/wish-list-api.service';
import {PlaceDetails} from '../../../../_models/response/PlaceDetails';
import {WishList} from '../../../../_models/response/WishList';
import {WishListForm} from '../../../../_models/request/WishListForm';
import {ErrorMessage} from '../../../../_models/util/ErrorMessage';
import {HttpErrorResponse} from '@angular/common/http';
import {WishListItemService} from "../wishListItem/wish-list-item.service";

@Injectable({
  providedIn: 'root'
})
export class WishListService {


  constructor(private wishListApiServcie: WishListApiService,
              private wishListItemService: WishListItemService) {
  }

  public getByPlace(place: number | PlaceDetails): Promise<WishList[]> {

    let query: WishListQuery = new WishListQuery(this.wishListApiServcie);
    query.placeIds.push(place instanceof PlaceDetails ? place.id : place);

    let result: WishList[] | ErrorMessage;

    return query.execute()
        .then((response: JSON[]) => {
          if(response == null)
            throw new ErrorMessage("wishlistget.unable");
          else {
            result = [];
            for(let json of response) {
              result.push(new WishList(json));
            }
            return result;
          }
        })
        .catch((error: HttpErrorResponse) => {
          throw new ErrorMessage(error.message);
        });

  }


  public addNew(form: WishListForm): Promise<WishList> {

    if(!form.validate())
      throw form.errors;

    return this.wishListApiServcie.newWishList(form)
      .then((response: JSON) => {
        if(response == null)
          throw new ErrorMessage("newwishlist.error");
        else
          return new WishList(response);
      })
      .catch((error: HttpErrorResponse) => {
        throw new ErrorMessage(error.message);
      });

  }


  public async getWishList(id: number): Promise<WishList> {
    let result: WishList;

    let placeIds: number[] = null;
    let wishListIds: number[] = [id];
    let active: Boolean = null;

    result = await this.wishListApiServcie.get(placeIds, wishListIds, active)
      .then((response: JSON) => {
        if(response === null)
          throw new ErrorMessage("get_wish_list.unable");
        else
          return new WishList(response);
      });

    for (let item of result.wishListItems.toArray()) {
      item = await this.wishListItemService.get(item);
    }

    return result;
  }


  public archive(wishList: WishList): Promise<Boolean> {

    return this.wishListApiServcie.archive(wishList.id)
      .then((r: boolean) => {
        if (r)
          wishList.status = false;
        return r;
      });

  }

}

export class WishListQuery {

  private _ids: number[] = null;
  private _placeIds: number[] = [];
  private _active: Boolean = null;

  public constructor(private api: WishListApiService) {}

  public execute() {
    return this.api.get(this._placeIds, this._ids, this._active);
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
}

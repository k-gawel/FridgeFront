import {Injectable} from '@angular/core';
import {WishListApiService} from '../../../../api/wishlist/wish-list-api.service';
import {PlaceDetails} from '../../../../../_models/request/PlaceDetails';
import {WishList} from '../../../../../_models/request/WishList';
import {WishListForm} from '../../../../../_models/response/WishList';
import {Subject} from 'rxjs';
import {Entity} from '../../../../../_models/request/Entity';
import {ErrorMessage} from '../../../../../_models/util/ErrorMessage';
import {HttpErrorResponse} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WishListService {

  public $archived = new Subject<Entity>();

  constructor(private wishListApiServcie: WishListApiService) { }

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
    let result: WishList | ErrorMessage;

    let placeIds: number[] = null;
    let wishListIds: number[] = [id];
    let active: Boolean = null;

    await this.wishListApiServcie.get(placeIds, wishListIds, active)
      .then((response: JSON) => {
        if(response === null)
          result = new ErrorMessage("get_wish_list.unable");
        else
          result = new WishList(response);
      })
      .catch((error: ErrorMessage) => {
        result = error;
      });

    if(result instanceof Error)
      throw result;

    return result;
  }


  public archive(wishList: WishList): Promise<Boolean> {

    return this.wishListApiServcie.archivize(wishList.id)
      .then((r: boolean) => {
        return r;
      })
      .catch((e: HttpErrorResponse) => {
        throw new ErrorMessage(e.message);
      })

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

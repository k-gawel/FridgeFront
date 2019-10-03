import {OffsetLimit} from "../../../_util/OffsetLimit";

export class WishListGetQuery {

  public usersIds: number[];
  public placesIds: number[];
  public wishListsIds: number[];
  public active: boolean = null;
  public offsetLimit: OffsetLimit;

}

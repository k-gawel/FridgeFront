import {OffsetLimit} from "../../../_util/OffsetLimit";

export class WishListGetQuery {

  public users: number[];
  public places: number[];
  public wishLists: number[];
  public active: boolean = null;
  public offsetLimit: OffsetLimit;

}

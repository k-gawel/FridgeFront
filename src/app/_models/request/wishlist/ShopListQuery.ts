import {Query} from "../Query";
import {OffsetLimit} from "../../../_util/OffsetLimit";

export class ShopListQuery extends Query {

  public shopLists: number[];
  public places: number[];
  public status: boolean;
  public offsetLimit: OffsetLimit;

}

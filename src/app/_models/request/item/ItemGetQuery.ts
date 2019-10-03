import {Query} from "../Query";
import {OffsetLimit} from "../../../_util/OffsetLimit";

export class ItemGetQuery extends Query {

  public items: number[];
  public places: number[];
  public category: number;
  public name: string;
  public barcode: number;
  public offsetLimit: OffsetLimit;

}

import {OffsetLimit} from "../../../_util/OffsetLimit";
import {Query} from "../Query";

export class ItemInstanceParams {

  public readonly opened: boolean;
  public readonly frozen: boolean;
  public readonly deleted: boolean;

  constructor(opened: boolean, frozen: boolean, deleted: boolean) {
    this.opened = opened;
    this.frozen = frozen;
    this.deleted = deleted;
  }

}

export class ItemInstanceQuery extends Query {

  public itemInstances: number[];
  public items: number[];
  public places: number[];
  public containers: number[];
  public owners: number[];
  public params: ItemInstanceParams;
  public offsetLimit: OffsetLimit;

}

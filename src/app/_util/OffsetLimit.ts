import {HttpParams} from "@angular/common/http";

export class OffsetLimit {

  private readonly _offset: number;
  private readonly _limit:  number;

  constructor(offset: number, limit: number) {
    this._offset = offset;
    this._limit = limit;
  }

  get offset(): number {
    return this._offset;
  }

  get limit(): number {
    return this._limit;
  }

  public appendToParams(params: HttpParams): HttpParams {
    params = params.append("offset", this._offset.toString());
    params = params.append("limit",  this._limit.toString());
    return params;
  }

}

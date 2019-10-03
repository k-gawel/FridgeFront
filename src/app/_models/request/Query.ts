import {HttpParams} from "@angular/common/http";

export abstract class Query {

  public toHttpParams(): HttpParams {
    let map = new Map<string, string>();
    this.convertValue(this, null, map);
    let result = this.mapToParams(map);
    return result;
  }


  private mapToParams(map: Map<string, string>): HttpParams {
    let result = new HttpParams();
    map.forEach((v, k) => result = result.append(k, v) );
    return result;
  }


  private isPrimitiveArray(val: any[]): boolean {
    return val.filter(v => typeof v === 'object').length === 0;
  }


  private convertValue(val: any, parentKey: string, params: Map<string, string>): void {
    if(val instanceof Array)
      this.convertArray(val, parentKey, params);
    else if(typeof val === 'object')
      this.convertObject(val, parentKey, params);
    else
      this.convertPrimitive(val, parentKey, params);
  }

  private convertPrimitive(val: any, parentKey: string, params: Map<string, string>): void {
    params.set(parentKey, JSON.stringify(val));
  }

  private convertArray(val: any[], parentKey: string, params: Map<string, string>): void {
    for(let i = 0; i < val.length; i++) {
      let key = parentKey + "[" + i + "]";
      this.convertValue(val[i], key, params);
    }
  }

  private convertObject(val: object, parentKey: string, params: Map<string, string>) {
    for (let key in val) {
      if (val.hasOwnProperty(key)) {
        let k = this.getKey(key, parentKey);
        this.convertValue(val[key], k, params);
      }
    }
  }

  private getKey(key: string, parentKey: string): string {
    if(key.startsWith("_"))
      key = key.substr(1);
    return parentKey == null ? key : parentKey + "." + key;
  }


}

import {Entity, EntityList} from '../../_models/request/Entity';

export class IdSelector {
  get id(): number[] {
    return this._id;
  }

  private _id: number[];

  constructor(entity: number | number[] | Entity | EntityList | Entity[]) {

    this._id = [];

    if(typeof entity === 'number')
      this._id.push(entity);
    if(entity instanceof Entity) {
      this._id.push(entity.id);
    }
    if(entity instanceof Array) {
      for(let singleEntity of entity) {
        if(singleEntity instanceof Entity)
          this._id.push(singleEntity.id);
        if(typeof singleEntity === 'number')
          this._id.push(singleEntity);
      }
    }
    if(entity instanceof EntityList) {
      for(let singleEntity of entity.list) {
        if(singleEntity instanceof Entity)
          this._id.push(singleEntity.id);
      }
    }

  }

  public toString(): string {

    let result: string = '';

    for(let i = 0; i < this.id.length; i++) {
      result = result + this.id.toString();
      if(i !== this.id.length - 1) result = result + ',';
    }

    return result;
  }
}

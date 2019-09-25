import {Entity, EntityList} from '../../_models/response/Entity';

export class IdSelector {
  get id(): number[] {
    return this._id;
  }

  private _id: number[];

  constructor(entity: number | number[] | Entity | EntityList<Entity> | Entity[]) {
    this._id = [];

    if (entity instanceof Entity)
      this._id.push(entity.id);

    else if (entity instanceof EntityList)
      this._id = entity.getAllIds();

    else if (typeof entity === "number")
      this._id.push(entity);

    else
      for (let e of entity)
        this.id.push(typeof e === "number" ? e : e.id);

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

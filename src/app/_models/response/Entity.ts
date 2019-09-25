export class Entity {

  public id: number;

  constructor(entry?: JSON | number) {
    if (entry == undefined)
      return;
    else if (typeof entry == 'number')
      this.id = entry;
    else if (entry['id'] != undefined)
      this.id = entry['id'];
    else if (entry['key'] != undefined)
      this.id = entry['key'];
  }

  public isEmpty(): boolean {
    return this.id != null;
  }

  public equals(entity: Entity): boolean {
    if (entity == null) return false;
    return entity.id == this.id;
  }

}

export class EntityList<T extends Entity> implements Iterable<T> {

  [id: number]: T;

  public constructor(items?: T[]) {
    if (items != null)
      items.forEach(e => this.add(e));
  }


  public getByIds(ids: number[]): EntityList<T> {
    let result = new EntityList<T>();
    result.addAll(ids.map(id => this[id]));
    return result;
  }


  public contains(entity: T): boolean {
    return entity != undefined && this[entity.id] != undefined;
  }


  public add(entity: T): EntityList<T> {
    this[entity.id] = entity;
    return this;
  }


  public addAll(list: EntityList<T> | T[]): EntityList<T> {
    if (list == null) return;
    list.forEach(e => this.add(e));
    return this;
  }


  public getAllIds(): number[] {
    return <number[]> this.map(e => e.id);
  }


  public remove(entity: Entity | number): EntityList<T> {
    let id = typeof entity === "number" ? entity : entity.id;
    this[id] = undefined;
      return this;
  }


  public size(): number {
    return Object.keys(this).length;
  }


  public toArray(): T[] {
    return Object.values(this);
  }


  [Symbol.iterator]() {
    let pointer = 0;
    let ids = Object.keys(this);

    return {
      next(): IteratorResult<T> {
        return pointer < ids.length ?
          {done: false, value: this[ids[pointer++]]} : {done: true, value: null};
      }
    }

  }


  public first(): T {
    return Object.values(this)[0];
  }

  public map<U>(callbackfn: (value: T) => U): U[] {
    return Object.values(this).map(o => callbackfn(o));
  }


  public forEach(callbackfn: (value: T) => any): void {
    Object.values(this).forEach(o => callbackfn(o));
  }


  public filter(callbackfn: (value: T) => boolean): EntityList<T> {
    let values = Object.values(this).filter(o => callbackfn(o));
    return new EntityList<T>(values);
  }


}

export class Entity {

    public id: number;

    constructor(json?: JSON) {
        if(json == undefined)
          return;
        else if (json['id'] != undefined)
          this.id = json['id'];
        else if (json['key'] != undefined)
          this.id = json['key'];
    }

    public isEmpty(): boolean {
      return this.id != null;
    }

    public equals(entity: Entity): boolean {
        if(entity == null) return false;
        return entity.id == this.id;
    }

}

export class EntityList {

    public list: Entity[];

    public constructor() { this.list = [] }

    public toArray() {
        return this.list
    }

    public getByIds(ids: number[]): EntityList {
      const result: EntityList = new EntityList();
      result.list = this.list.filter(e => ids.includes(e.id));
      return result;
    }

    public getById(id: number): Entity {
      return this.list.find(e => e.id === id);
    }

    public static intersect(listA: EntityList, listB: EntityList): EntityList {
      const result: EntityList = new EntityList();
      result.list = listA.list.filter(e => listB.contains(e));
      return result;
    }

    public contains(entity: Entity): boolean {
      return this.list.find(e => e.equals(entity)) != undefined;
    }

    public push(entity: Entity): EntityList {
      if(!this.contains(entity))
        this.list.push(entity);
      else
        return this;
      return this;
    }

    public pushAll(list: EntityList): EntityList {
        list.list.forEach(element => this.push(element) );
        return this;
    }

    public getAllIds(): number[] {
      return this.list.map(e => e.id);
    }

    public remove(entity: Entity | number): EntityList {
      entity = typeof entity === 'number' ? this.getById(entity) : entity;
      this.list.filter(e => !e.equals(entity));
      return this;
    }

    public removeAll() {
        this.list = [];
    }

    public size(): number {
        return this.list.length;
    }

}

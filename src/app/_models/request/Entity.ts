
export class Entity {

    public id: number;

    constructor(json?: JSON) {
        if(json == undefined)
          return;

        if(json['id'] != undefined) {
          this.id = json['id'];
          return;
        }
        if(json['key'] != undefined) {
          this.id = json['key'];
          return;
        }
    }

    public isEmpty(): boolean {
      return this.id !== null;
    }

    public equals(entity: Entity): boolean {
        if(entity == null) return false;
        return entity.id == this.id;
    }

}

export class EntityList {

    public list: Entity[];

    public constructor() { this.list = [] }

    public getAll() {
        return this.list
    }

    public getByIds(ids: number[]): EntityList {

      let result: EntityList = new EntityList();

      this.list.forEach( (e: Entity) => {
        if(ids.includes(e.id))
          result.push(e);
      } );

      return result;
    }

    public getById(id: number): Entity {

        for(let i = 0; i < this.list.length; i++) {
            if(this.list[i].id == id) return this.list[i];
        }

        return null;
    }

    public static intersect(listA: EntityList, listB: EntityList): EntityList {

      let result: EntityList = new EntityList();

      listA.list.forEach( (e: Entity) => {
        if(listB.contains(e))
          result.push(e);
      } );

      return result;

    }

    public contains(entity: Entity): boolean {

        for(let i = 0; i < this.list.length; i++) {
            if(entity.equals(this.list[i])) return true;
        }

        return false;
    }

    public push(entity: Entity): EntityList {

       if(entity === null) return this;

        let push: boolean = true;

        this.list.forEach(element => {
            if(element.equals(entity)) {
                element = entity;
                push = false;
                return this;
            }
        });

        if(push)
          this.list.push(entity);

        return this;
    }

    public pushAll(list: EntityList): EntityList {

        list.list.forEach(element => {
            this.push(element);
        });

        return this;
    }

    public getAllIds(): number[] {

      let result: number[] = [];

      this.list.forEach((e: Entity) => result.push(e.id));

      return result;
    }

    public remove(entity: Entity | number): EntityList {

      if(typeof entity !== 'number') {
        this.list = this.list.filter(element => !entity.equals(element));
      }
      else {
        this.list = this.list.filter(element => !(entity === element.id));
      }

      return this;
    }

    public removeAll() {
        this.list = [];
    }

    public size(): number {
        return this.list.length;
    }




}

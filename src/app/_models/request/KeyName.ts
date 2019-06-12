import {Entity, EntityList} from './Entity';

export class KeyName extends Entity {
    public name: string;

    constructor(id?: any, name?: any) {
        super();

        if(id != undefined && name != undefined) {
          this.id = id;
          this.name = name;
        }

    }

    public fromJSON(json: JSON): KeyName {
      this.id = json['id'];
      this.name = json['name'];
      return this;
    }

    public static fromJSON(json: JSON): KeyName {

        const result: KeyName = new KeyName();

        if(json['id'] != null && json['name'] != null) {
          result.id = json['id'];
          result.name = json['name'];
        } else {

        }

        return result;

    }


}

export class KeyNameList extends EntityList {


    list: KeyName[];


    constructor(json?: JSON | JSON[]) {
        super();
        this.list = [];

        if(json != undefined) {
          if (json instanceof Array)
            this.fromJSONArray(json);
          else
            this.fromJSONObject(json);
        }


    }


    public static fromJSON(json: JSON[]): KeyNameList {

    let result = new KeyNameList();

    json.forEach( (e: JSON) => {
      result.push(KeyName.fromJSON(e));
    } );

    return result;

  }


    private fromJSONObject(json: JSON) {
      let keys = Object.keys(json);

      for(let key of keys) {
        let keyName = new KeyName(key, json[key]);
        this.list.push(keyName);
      }
    }


    private fromJSONArray(jsonArr: JSON[]) {

      for(let json of jsonArr) {
        let keyName = new KeyName();
        keyName.fromJSON(json);
        this.list.push(keyName);
      }

    }


    public getById(id: number): KeyName {
      return <KeyName> super.getById(id);
    }


    public getByIds(ids: number[]): KeyNameList {
      return <KeyNameList> super.getByIds(ids);
    }


    public getAll(): KeyName[] {
        return this.list;
    }


    public searchByName(text: string): KeyNameList {
        const result = new KeyNameList();

        this.list.forEach( (element: KeyName) => {
            if (element.name.indexOf(text) !== -1) {
                result.push(element);
            }
        });

        return result;
    }


    public containsKey(key: number): boolean {
        for (let i = 0; i < this.list.length; i++) {
            if (this.list[i].id == key) { return true; }
        }
        return false;
    }



}

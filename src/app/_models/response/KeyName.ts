import {Entity, EntityList} from './Entity';

export class KeyName extends Entity {
    public name: string;

    constructor(json?: JSON) {
        super(json);

        if(json != undefined)
          this.name = json['name'];
    }

    static clone(keyName: KeyName): KeyName {
      let result = new KeyName();
      result.id   = keyName.id;
      result.name = keyName.name;
      return result;
    }
}

export class KeyNameList extends EntityList {

    list: KeyName[] = [];

    constructor(json?: JSON | JSON[]) {
        super();

        if(json == undefined)
          return;
        else if (json instanceof Array)
          this.fromJSONArray(json);
        else
            this.fromJSONObject(json);
    }

    private fromJSONObject(json: JSON) {
      let keys = Object.keys(json);
      this.list = keys.map(k => {
        let result = new KeyName();
        result.id = <number> k;
        result.name = json[k];
        return result;
      });
    }

    private fromJSONArray(jsonArr: JSON[]) {
      this.list = jsonArr.map(j => new KeyName(j));
    }

    public getById(id: number): KeyName {
      return <KeyName> super.getById(id);
    }

    public getByIds(ids: number[]): KeyNameList {
      return <KeyNameList> super.getByIds(ids);
    }

    public toArray(): KeyName[] {
        return this.list;
    }

    public searchByName(text: string): KeyNameList {
        const result = new KeyNameList();
        result.list = this.list
          .filter(kn => kn.name.toUpperCase().includes(text.toUpperCase()));
        return result;
    }

}

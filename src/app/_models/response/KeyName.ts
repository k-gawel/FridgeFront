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

export class KeyNameList<T extends KeyName = KeyName> extends EntityList<T> {

  constructor(json?: JSON | JSON[]) {
    super();

    if (json == undefined)
      return;
    else if (json instanceof Array)
      this.fromJSONArray(json);
    else
      this.fromJSONObject(json);
  }


  private fromJSONObject(json: JSON) {
    Object.keys(json).map(k => {
      let result = new KeyName();
      result.id = Number.parseInt(k);
      result.name = json[k];
      return result;
    })
      .forEach(v => this.add(<T> v));
  }


  private fromJSONArray(jsonArr: JSON[]) {
    jsonArr.map(j => new KeyName(j))
      .forEach(k => this.add(<T> k));
  }


  public searchByName(text: string): KeyNameList {
    return <KeyNameList> <unknown> this.filter(kn => kn.name == text);
  }


}

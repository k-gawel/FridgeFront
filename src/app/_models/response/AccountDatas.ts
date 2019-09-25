import {KeyName, KeyNameList} from './KeyName';

export class AccountDatas extends KeyName {

  places: KeyNameList<KeyName>;

  constructor(json?: JSON) {
    super();

    if(json == null)
      throw new Error("JSON is null");

    this.id = json['id'];
    this.name = json['name'];
    this.places = new KeyNameList<KeyName>(json['places']);

  }


}

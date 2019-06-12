import {KeyName, KeyNameList} from './KeyName';

export class AccountDatas extends KeyName {

  token: string;
  places: KeyNameList;

  constructor(json?: JSON) {
    super();

    if(json != undefined) {

      this.id = json['id'];
      this.name = json['name'];
      this.token = json['token'];
      this.places = new KeyNameList(json['places']);

    }

  }


}

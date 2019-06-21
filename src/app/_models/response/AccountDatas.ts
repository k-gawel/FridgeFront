import {KeyName, KeyNameList} from './KeyName';
import {Producer, ProducersList} from './item/Producer';
import {Category} from './Category';

export class InitialResponse extends KeyName {

  token: string;
  places: KeyNameList;

  constructor(json?: JSON) {
    super();

    if(json != undefined) {

      this.id = json['id'];
      this.name = json['name'];
      this.token = json['token'];
      this.places = new KeyNameList(json['places']);

      (<JSON[]> json['producers'])
        .forEach(j => new Producer(j));
      Category.rootCategory = new Category(json['root_category'])

    }

  }


}

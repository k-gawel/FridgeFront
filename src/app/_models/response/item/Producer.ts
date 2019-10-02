import {KeyName, KeyNameList} from '../KeyName';

export class Producer extends KeyName {

  constructor(json?: JSON) {
    super(json);

    if(json == undefined)
      return;

    ProducersList.ALL.add(this);
  }

}

export class ProducersList extends KeyNameList<Producer> {

  public static ALL: ProducersList = new ProducersList();

  constructor(json?: JSON[]) {
    super();
    Object.setPrototypeOf(this, ProducersList.prototype);

    if (json != undefined)
      json.map(j => new Producer(j))
        .forEach(p => ProducersList.ALL.add(p));
  }

}

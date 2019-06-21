import {KeyName, KeyNameList} from '../KeyName';

export class Producer extends KeyName {

  constructor(json?: JSON) {
    super();

    if(json == undefined)
      return;

      super(json['id'], json['name']);
      ProducersList.ALL.push(this);
  }

}

export class ProducersList extends KeyNameList {

  public list: Producer[] = [];
  public static ALL: ProducersList = new ProducersList();

  public constructor(json?: JSON) {
    super()
  }

  public getById(id: number): Producer {
    return <Producer> super.getById(id);
  }


  public getByIds(ids: number[]): ProducersList {
    return <ProducersList> super.getByIds(ids);
  }


  public searchByName(name: string): ProducersList {
    return <ProducersList> super.searchByName(name);
  }


}
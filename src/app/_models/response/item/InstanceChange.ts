import {Entity, EntityList} from '../Entity';
import {KeyName, KeyNameList} from '../KeyName';
import {ItemsList} from './ItemsList';
import {ItemInstance} from './ItemInstance';
import {UserDate} from "../../util/UserDate";

export class InstanceChange extends Entity {

  instance: ItemInstance;
  changeType: string;
  changed: UserDate;

  constructor(json?: JSON) {
    super(json);
    
    if(json == undefined) return;

    this.id = json['id'];

    this.instance = new ItemInstance(json['instance']);
    this.changeType = InstanceChangeType[Number(json['changeType'])];
    this.changed = new UserDate(json['changed']);

  }
  
}

export class InstanceChangeList extends EntityList<InstanceChange> {

  list: InstanceChange[] = [];
  items: ItemsList;
  users: KeyNameList<KeyName>;
  containers: KeyNameList<KeyName>;

  constructor(json?: JSON[]) {
    super();

    this.users = new KeyNameList(json['users']);
    this.containers = new KeyNameList(json['_containers']);
    this.items = new ItemsList(json['items']);
    (<JSON[]> json['changes']).forEach(j => this.add(new InstanceChange(j)));
  }

  public toString(id?: number): string {
    if (id == null)
      return "";

    let result: string = '';
    let change: InstanceChange = this[id];


    return result;
  }

}

export enum InstanceChangeType {
  'added',
  'deleted',
  'opened',
  'frozed',
  'unfrozed'
}

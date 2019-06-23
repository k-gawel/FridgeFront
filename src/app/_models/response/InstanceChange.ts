import {Entity, EntityList} from './Entity';
import {Item} from './item/Item';
import {KeyName, KeyNameList} from './KeyName';
import {ItemsList} from './item/ItemsList';
import {ItemInstance} from './item/ItemInstance';

export class InstanceChange extends Entity {

  instance: ItemInstance;
  accountId: number;
  changeDate: Date;
  changeType: string;

  constructor(json?: JSON) {
    super(json);
    
    if(json == undefined) return;

    this.id = json['id'];
    this.accountId = json['accountId'];
    this.instance = new ItemInstance(json['instance']);
    this.changeDate = new Date(InstanceChangeType[json['changeDate']]);
    this.changeType = InstanceChangeType[Number(json['changeType'])];
  }
  
}

export class InstanceChangeList extends EntityList {

  list: InstanceChange[] = [];
  items: ItemsList;
  users: KeyNameList;
  containers: KeyNameList;

  constructor(json?: JSON[]) {
    super();

    this.users = new KeyNameList(json['users']);
    this.containers = new KeyNameList(json['_containers']);
    this.items = new ItemsList(json['items']);
    this.list = (<JSON[]> json['changes']).map(j => new InstanceChange(j));
  }

  public toString(id: number): string {

    let result: string = '';
    let change: InstanceChange = <InstanceChange> this.getById(id);

    result = result + (<KeyName> this.users.getById(change.accountId)).name + " ";
    result = result + change.changeType + " ";
    result = result + (<Item> this.items.getById(change.instance.itemId)).name + " ";
    result = result + "on " + change.changeDate + " ";
    result = result + "(" + (<KeyName> this.containers.getById(change.instance.containerId)).name + ")";

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

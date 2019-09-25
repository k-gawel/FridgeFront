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

    result = result + this.users[change.accountId].name + " ";
    result = result + change.changeType + " ";
    result = result + this.items[change.instance.itemId].name + " ";
    result = result + "on " + change.changeDate + " ";
    result = result + "(" + change.instance.container.name + ")";

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

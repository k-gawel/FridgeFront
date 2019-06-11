import {Entity, EntityList} from './Entity';
import {Item} from './item/Item';
import {KeyName, KeyNameList} from './KeyName';
import {ItemsList} from "./item/ItemsList";
import {ItemInstancesList} from "./item/ItemInstancesLst";
import {ItemInstance} from "./item/ItemInstance";

export class InstanceChange extends Entity {

  instance: ItemInstance;
  accountId: number;
  changeDate: Date;
  changeType: string;

  constructor() {
    super();
  }

  public static fromJSON(json: JSON): InstanceChange {
    let result = new InstanceChange();

    result.id = json['id'];
    result.accountId = json['accountId'];
    result.instance = new ItemInstance(json['instance']);
    result.changeDate = new Date(InstanceChangeType[json['changeDate']]);
    result.changeType = InstanceChangeType[Number(json['changeType'])];

    return result;
  }

}

export class InstanceChangeList extends EntityList {


  items: ItemsList;
  users: KeyNameList;
  containers: KeyNameList;

  constructor() {
    super();
  }

  public static fromJSON(json: JSON): InstanceChangeList {

    let result = new InstanceChangeList();

    result.users = KeyNameList.fromJSON(json['users']);
    result.containers = KeyNameList.fromJSON(json['_containers']);
    result.items = new ItemsList(json['items']);

    (<JSON[]> json['changes']).forEach( (e: JSON) => {
      result.list.push(InstanceChange.fromJSON(e))
    } );

    console.log("RESULT CHANGES LIST")
    console.log(result);

    return result;
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

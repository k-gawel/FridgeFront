import {EntityList} from '../Entity';
import {Container, ContainersList} from '../Container';
import {ItemsList} from './ItemsList';
import {KeyName, KeyNameList} from '../KeyName';
import {Item} from './Item';
import {ItemInstance} from './ItemInstance';
import {IdSelector} from '../../../_service/utils/EntitySelector';

export class ItemInstancesList extends EntityList {

  public static readonly ALL: ItemInstancesList = new ItemInstancesList();

  public list: ItemInstance[] = [];
  private pointer = 0;

  constructor(json?: JSON[]) {
    super();

    if (json == undefined)
      return;

    this.list = json.map(j => new ItemInstance(j));
  }

  public push(instance: ItemInstance): ItemInstancesList {
    return <ItemInstancesList> super.push(instance);
  }

  public getById(id: number): ItemInstance {
    return <ItemInstance> super.getById(id);
  }

  public getByIds(ids: number[]): ItemInstancesList {
    return <ItemInstancesList> super.getByIds(ids);
  }

  public getByContainers(containers: ContainersList | Container[] | Container | number | number[]): ItemInstancesList {
    let ids = new IdSelector(containers).id;

    let result: ItemInstancesList = new ItemInstancesList();
    result.list = this.list.filter(i => ids.includes(i.containerId));
    return result;
  }

  public getContainers(): ContainersList {
    const result = new ContainersList();
    result.list = this.list.map(i => ContainersList.ALL.getById(i.containerId));
    return result;
  }

  public getItemIds(): number[] {
    return this.list.map(i => i.itemId);
  }

  public getByItems(items: number | Item | number[] | ItemsList | Item[]): ItemInstancesList {
    let ids: number[] = new IdSelector(items).id;

    const result: ItemInstancesList = new ItemInstancesList();
    result.list = this.list.filter((ii: ItemInstance) => ids.includes(ii.itemId));
    return result;
  }

  public getOwnerIds(): number[] {
    return this.list.map(i => i.addedById);
  }

  public getByOwners(owners: number | KeyName | number[] | KeyNameList | KeyName[]): ItemInstancesList {
    let ids: number[] = new IdSelector(owners).id;

    const result: ItemInstancesList = new ItemInstancesList();
    result.list = this.list.filter(i => ids.includes(i.addedById));
    return result;
  }

  public addInstance(instance: ItemInstance) {
    this.list.push(instance);
  }

  public toArray(): ItemInstance[] {
    return this.list;
  }

  public isEmpty(): boolean {
    return this.list.length == 0;
  }

  public remove(instance: ItemInstance): ItemInstancesList {
    return <ItemInstancesList> super.remove(instance);
  }

  public next(): IteratorResult<ItemInstance> {
    if (this.pointer < this.list.length) {
      return {
        done: false,
        value: this.list[this.pointer++]
      };
    } else {
      return {
        done: true,
        value: null
      };
    }
  }

  public filterByOpen(open: boolean): ItemInstancesList {
    const result = new ItemInstancesList();
    result.list = this.list.filter(i => i.isOpen() == open);
    return result;
  }

  public filterByDeleted(deleted: boolean): ItemInstancesList {
    const result = new ItemInstancesList();
    result.list = this.list.filter(i => i.isDeleted() == deleted);
    return result;
  }

}

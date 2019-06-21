import {EntityList} from '../Entity';
import {Container, ContainersList} from '../Container';
import {ItemsList} from './ItemsList';
import {KeyName, KeyNameList} from '../KeyName';
import {Item} from './Item';
import {ItemInstance} from './ItemInstance';

export class ItemInstancesList extends EntityList {

  public static LIST: ItemInstancesList = new ItemInstancesList();

  public list: ItemInstance[];
  private pointer = 0;

  constructor(json?: JSON[]) {
    super();

    this.list = [];

    if (json == undefined)
      return;

    json.forEach((element: JSON) => {
      let newInstance = new ItemInstance(element);
      this.list.push(newInstance);
      ItemInstancesList.LIST.push(newInstance);
    })
  }


  public push(instance: ItemInstance): ItemInstancesList {
    return <ItemInstancesList> super.push(instance);
  }


  public getById(id: number): ItemInstance {
    return <ItemInstance> super.getById(id);
  }


  public static getById(id: number): ItemInstance {
    return null;
  }


  public getByIds(ids: number[]): ItemInstancesList {
    return <ItemInstancesList> super.getByIds(ids);
  }


  public getByContainer(container: number | Container): ItemInstancesList {

    let id: number;

    if (typeof container == 'number') {
      id = container;
    } else {
      id = container.id;
    }

    const result: ItemInstancesList = new ItemInstancesList();

    this.list.forEach(element => {
      if (element.containerId == id) {
        result.push(element);
      }
    });

    return result;

  }


  public getByContainers(containers: ContainersList | Container[] | number | number[]): ItemInstancesList {

    let result: ItemInstancesList = new ItemInstancesList();

    let containersIds: number[] = [];
    let instancesArray: ItemInstance[];

    if (typeof containers === 'number')
      return this.getByContainer(containers);
    if (containers instanceof ContainersList)
      containers.list.forEach((e: Container) => containersIds.push(e.id));
    else if (containers instanceof Array) {
      for (let container of containers) {
        containersIds.push(container instanceof Container ? container.id : container);
      }
    }

    result.list = this.list.filter(e => containersIds.includes(e.containerId));

    return result;
  }


  public getContainers(): ContainersList {
    const result: ContainersList = new ContainersList();

    this.list.forEach(element => {
      result.push(ContainersList.ALL.getById(element.containerId));
    });

    return result;
  }


  public static getContainers(): ContainersList {
    return ItemInstancesList.LIST.getContainers();
  }


  public getItemIds(): number[] {
    let result: number[] = [];

    this.list.forEach((ii: ItemInstance) => {
      result.push(ii.itemId);
    });

    return result;
  }


  public static getItemIds(): number[] {
    return this.LIST.getItemIds();
  }


  public getByItem(item: number | Item): ItemInstancesList {

    const result: ItemInstancesList = new ItemInstancesList();

    let id: number = typeof item === 'number' ? item : item.id;

    this.list.forEach(element => {
      if (element.itemId == id) {
        result.list.push(element);
      }
    });

    return result;

  }


  public static getByItem(item: number | Item): ItemInstancesList {

    return ItemInstancesList.LIST.getByItem(item);

  }


  public getByItems(items: number | number[] | ItemsList | Item[]): ItemInstancesList {

    let result: ItemInstancesList = new ItemInstancesList();
    let itemIds: number[] = [];

    if (typeof items === 'number')
      return this.getByItem(items);
    if (items instanceof ItemsList)
      itemIds = items.getAllIds();
    if (items instanceof Array) {
      for (let item of items) {
        itemIds.push(item instanceof Item ? item.id : item);
      }
    }

    result.list = this.list.filter((ii: ItemInstance) => itemIds.includes(ii.itemId));

    return result;
  }


  public getOwnerIds() {
    //TODO LOW PRIORITY GET OWNER IDS
  }


  public getByOwner(owner: number | KeyName): ItemInstancesList {

    const result: ItemInstancesList = new ItemInstancesList();

    let id: number = typeof owner === 'number' ? owner : owner.id;

    this.list.forEach(element => {
      if (element.addedById == id) {
        result.list.push(element);
      }
    });

    return result;

  }


  public static getByOwner(owner: number | KeyName): ItemInstancesList {
    return ItemInstancesList.LIST.getByOwner(owner);
  }


  public getByOwners(owners: number | number[] | KeyName | KeyNameList | KeyName[]): ItemInstancesList {

    if (typeof owners === 'number' || owners instanceof KeyName)
      return this.getByOwner(owners);

    if (owners instanceof KeyNameList)
      owners = owners.getAll();

    let result: ItemInstancesList = new ItemInstancesList();
    let ids: number[] = [];

    for (let owner of owners) {
      ids.push(owner instanceof KeyName ? owner.id : owner);
    }

    result.list = this.list.filter((ii: ItemInstance) => {
      ids.includes(ii.addedById)
    });

  }


  public static getByOwners(owners: number | number[] | KeyName | KeyNameList | KeyName[]): ItemInstancesList {
    return this.LIST.getByOwners(owners);
  }


  public addInstance(instance: ItemInstance) {
    this.list.push(instance);
  }


  public getInstances(): ItemInstance[] {
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


  public filtrByOpen(open: boolean): ItemInstancesList {
    const result = new ItemInstancesList();

    this.list.forEach(element => {
      if (element.isOpen() == open) {
        result.push(element);
      }
    });

    return result;
  }


  public filtrByDeleted(deleted: boolean): ItemInstancesList {
    const result = new ItemInstancesList();

    this.list.forEach(element => {
      if (element.isDeleted() == deleted) {
        result.push(element);
      }
    });

    return result;
  }

}

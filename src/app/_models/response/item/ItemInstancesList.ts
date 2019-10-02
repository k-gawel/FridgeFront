import {EntityList} from '../Entity';
import {Container, ContainersList} from '../Container';
import {ItemsList} from './ItemsList';
import {KeyName, KeyNameList} from '../KeyName';
import {Item} from './Item';
import {ItemInstance} from './ItemInstance';
import {IdSelector} from '../../../_service/utils/EntitySelector';
import {WishListItemList} from "../WishListItem";
import {ShopListList} from "../ShopList";

export class ItemInstanceFilter {

  constructor(deleted?: boolean | null, opened?: boolean | null, frozen?: boolean | null) {
    if(this.deleted === undefined) return;

    this.deleted = deleted;
    this.opened = opened;
    this.frozen = frozen;
  }

  deleted: boolean | null = false;
  opened:  boolean | null = null;
  frozen:  boolean | null = null;


}

export class ItemInstancesList extends EntityList<ItemInstance> {

  public static readonly ALL: ItemInstancesList = new ItemInstancesList();

  constructor(json?: JSON[]) {
    super();

    if (json == undefined)
      return;

    json.forEach(j => this.add(new ItemInstance(j)));
  }


  public getByContainers(containers: ContainersList | Container[] | Container | number | number[]): ItemInstancesList {
    let ids = new IdSelector(containers).id;
    let result = <ItemInstancesList> this.filter(i => ids.includes(i.container.id));

    Object.setPrototypeOf(result, ItemInstancesList.prototype);
    return result;
  }


  public getContainers(): ContainersList {
    let result = new ContainersList();
    result.addAll(this.map(i => i.container));
    return result;
  }


  public getItemIds(): number[] {
    let ids = <number[]> this.map(i => i.itemId);
    let idsSet = new Set(ids);
    return Array.from(idsSet.values());
  }


  public getByItems(items: number | Item | number[] | ItemsList | Item[]): ItemInstancesList {
    let ids: number[] = new IdSelector(items).id;
    let result = <ItemInstancesList> this.filter((ii: ItemInstance) => ids.includes(ii.itemId));

    Object.setPrototypeOf(result, ItemInstancesList.prototype);
    return result;
  }


  public getOwnerIds(): number[] {
    return <number[]> this.map(i => i.added.id);
  }


  public getByOwners(owners: number | KeyName | number[] | KeyNameList | KeyName[]): ItemInstancesList {
    let ids: number[] = new IdSelector(owners).id;
    let result = <ItemInstancesList> this.filter(i => ids.includes(i.added.id));

    Object.setPrototypeOf(result, ItemInstancesList.prototype);
    return result;
  }


  public filterByOpen(open: boolean | null): ItemInstancesList {
    let result;

    if (open != null)
      result = <ItemInstancesList> this.filter(i => i.isOpen() == open);
    else
      result = <ItemInstancesList> new ItemInstancesList().addAll(this);

    Object.setPrototypeOf(result, ItemInstancesList.prototype);
    return result;
  }


  public filterByDeleted(deleted: boolean | null): ItemInstancesList {
    let result;

    if (deleted != null)
      result = <ItemInstancesList> this.filter(i => i.isDeleted() == deleted);
    else
      result = <ItemInstancesList> new ItemInstancesList().addAll(this);

    Object.setPrototypeOf(result, ItemInstancesList.prototype);
    return result;
  }


  public filterByItems(items: number | Item | number[] | ItemsList): ItemInstancesList {
    let ids = new IdSelector(items).id;
    let result = <ItemInstancesList> this.filter(ii => ids.includes(ii.itemId));
    Object.setPrototypeOf(result, ItemInstancesList.prototype);
    return result;
  }



  public filterByWishListItems(items: WishListItemList): ItemInstancesList {
    let result;

    result = items == null ?
      <ItemInstancesList> this.filter(i => i.wishListItem == null)
      : <ItemInstancesList> this.filter(i => items.contains(i.wishListItem));

    Object.setPrototypeOf(result, ItemInstancesList.prototype);
    return result;
  }


  public filterByShopLists(lists: ShopListList): ItemInstancesList {
    let result;

    result = lists == null ?
      <ItemInstancesList> this.filter(i => i.shopList == null)
      : <ItemInstancesList> this.filter(i => lists.contains(i.shopList));

    Object.setPrototypeOf(result, ItemInstancesList.prototype);
    return result;
  }


  public filterByProps(filter: ItemInstanceFilter): ItemInstancesList {
    return this.filterByDeleted(filter.deleted)
               .filterByOpen(filter.opened);
  }

}

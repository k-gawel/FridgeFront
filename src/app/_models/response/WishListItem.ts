import {Entity, EntityList} from './Entity';
import {WishList, WishListList} from './WishList';
import {Item} from './item/Item';
import {Category} from './Category';
import {KeyName, KeyNameList} from './KeyName';
import {ItemInstance} from './item/ItemInstance';
import {PlaceUser} from "./place-user/PlaceUser";
import {PlaceUsersList} from "./place-user/PlaceUsersList";
import {ItemInstancesList} from "./item/ItemInstancesList";

export class WishListItem extends Entity {

  public author: KeyName;
  public createdOn: Date;
  public addedBy: KeyName;
  public wishList: WishList;
  public addedOn: Date;
  public addedInstance: ItemInstance;
  public comment: string;
  public category: Category;

  constructor(json?: JSON | JSON[]) {
    super();

    if (json == undefined)
      return;

    json = json instanceof Array ? json[0] : json;

    this.id = json['id'];
    WishListItemList.ALL.add(this);

    this.wishList = WishListList.ALL[json['wishListId']];
    this.wishList.wishListItems.add(this);

    this.author = PlaceUsersList.ALL[json['authorId']];
    this.createdOn = new Date(json['createdOn']);

    if (json['addedInstanceId'] && json['addedById'] && json['addedOn']) {
      this.addedBy = PlaceUsersList.ALL[json['addedById']];
      this.addedOn = new Date(json['addedOn']);

      this.addedInstance = ItemInstancesList.ALL[json['addedInstanceId']];
      this.addedInstance.wishListItem = this;
    }


    this.category = Category.getById(json['categoryId']);
    this.comment = json['comment'];
  };


  public matchWithItem(item: Item): boolean {
    for (let category of this.category.getFinalCategories())
      if (category.equals(item.category))
        return true;

    return false;
  }


}

export class WishListItemList extends EntityList<WishListItem> {

  public static readonly ALL: WishListItemList = new WishListItemList();

  constructor(json?: JSON[]) {
    super();
    if (json == null) return;

    json.forEach(j => this.add(new WishListItem(j)));
  }


  public getWishLists(): WishListList {
    let valuesSet = new Set<WishList>();
    this.map(i => <WishList> i.wishList)
      .forEach(l => valuesSet.add(l));

    let result = new WishListList();
    result.addAll(Array.from(valuesSet.values()));
    return result;
  }


  public getCategories(): Category[] {
    let valuesSet = new Set<Category>();
    this.map(i => i.category)
      .forEach(c => valuesSet.add(c));
    return Array.from(valuesSet);
  }


  public filterByItem(item: Item): WishListItemList {
    let result = this.filter(i => i.matchWithItem(item));
    Object.setPrototypeOf(result, WishListItemList.prototype);
    return <WishListItemList> result;
  }


}

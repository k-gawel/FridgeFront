import {WishListItem, WishListItemList} from './WishListItem';
import {PlacesList} from "./Place";
import {PlaceElement, PlaceElementList} from "./PlaceElement";
import {UserDate} from "../util/UserDate";

export class WishList extends PlaceElement {

  public status: boolean;

  public created: UserDate;
  public archived: UserDate;

  public description: string;
  public wishListItems: WishListItemList = new WishListItemList();

  public constructor(json?: JSON | JSON[]) {
    super();

    if (json == undefined) return;
    json = json instanceof Array ? json[0] : json;

    this.id = json['id'];
    WishListList.ALL.add(this);

    this.name = json['name'];
    this.status = json['status'];

    if(json['created'])
      this.created = new UserDate(json['created']);

    if(json['archived'])
      this.archived = new UserDate(json['archived']);

    this.place = PlacesList.ALL[json['placeId']];
    this.place.wishLists.add(this);

    this.description = json['description'];
    (<JSON[]> json['items']).forEach(j => new WishListItem(j));
  }


  public pushNewItem(listItem: WishListItem) {
    this.wishListItems.add(listItem);
  }

  public addedSize(): number {
    return this.wishListItems.filterByAdded(true).size();
  }

  public missingSize(): number {
    return this.wishListItems.filterByAdded(false).size();
  }

  public isComplete(): boolean {
    return this.addedSize() === this.wishListItems.size();
  }


}


export class WishListList extends PlaceElementList<WishList> {

  public static readonly ALL: WishListList = new WishListList();


  public constructor(json?: JSON[]) {
    super();
    if (json == null) return;

    json.forEach(j => this.add(new WishList(j)));
  }


  public getByStatus(status: boolean): WishListList {
    let result: WishListList = <WishListList> this.filter(w => w.status === status);
    Object.setPrototypeOf(result, WishListList.prototype);
    return result;
  }


  public getAllItems(): WishListItemList {
    let result = new WishListItemList();

    this.map(w => w.wishListItems)
      .forEach(i => result.addAll(i));
    return result;
  }


}

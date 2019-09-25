import {WishListItem, WishListItemList} from './WishListItem';
import {PlaceDetailsList} from "./PlaceDetails";
import {PlaceElement, PlaceElementList} from "./PlaceElement";
import {LocalDate} from "../../_util/date/JavaLocalDate";

export class WishList extends PlaceElement {

  public status: boolean;

  public createdOn: LocalDate;
  public archivedOn: LocalDate;

  public description: string;
  public wishListItems: WishListItemList = new WishListItemList();

  public constructor(json?: JSON | JSON[]) {
    super();

    if (json == undefined) return;
    json = json instanceof Array ? json[0] : json;

    this.id = json['id'];
    WishListList.ALL.add(this);

    this.name = json['name'];
    this.createdOn = new LocalDate(json['created']);

    this.place = PlaceDetailsList.ALL[json['placeId']];
    this.place.wishLists.add(this);

    this.status = json['status'];
    this.archivedOn = new LocalDate(json['archivedOn']);

    this.description = json['description'];
    (<JSON[]> json['items']).forEach(j => new WishListItem(j));
  }


  public pushNewItem(listItem: WishListItem) {
    this.wishListItems.add(listItem);
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

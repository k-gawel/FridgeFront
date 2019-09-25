import {UserDate} from "../util/UserDate";
import {ItemInstancesList} from "./item/ItemInstancesList";
import {PlaceElement, PlaceElementList} from "./PlaceElement";
import {ItemInstance} from "./item/ItemInstance";
import {PlaceDetails, PlaceDetailsList} from "./PlaceDetails";

export class ShopList extends PlaceElement {

  status: boolean;

  description: string;
  shopName: string;

  created: UserDate;
  instances: ItemInstancesList = new ItemInstancesList();

  constructor(json: JSON) {
    super();
    if (json == undefined) return;

    this.id = json['id'];
    ShopListList.ALL.add(this);

    this.status = json['status'];
    this.shopName = json['shopName'];

    this.place = PlaceDetailsList.ALL[json['placeId']];
    this.place.shopLists.add(this);

    this.created = new UserDate(json['created']);
    (<number[]> json['instances']).map(id => ItemInstancesList.ALL[id])
      .forEach(ii => this.addNewInstance(ii));
  }

  public addNewInstance(instance: ItemInstance): void {
    this.instances.add(instance);
    instance.shopList = this;
  }


}


export class ShopListList extends PlaceElementList<ShopList> {

  public static readonly ALL = new ShopListList();


}

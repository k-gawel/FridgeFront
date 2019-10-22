import {UserDate} from "../util/UserDate";
import {ItemInstancesList} from "./item/ItemInstancesList";
import {PlaceElement, PlaceElementList} from "./PlaceElement";
import {ItemInstance} from "./item/ItemInstance";
import {PlacesList} from "./Place";

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

    this.place = PlacesList.ALL[json['placeId']];
    this.place.shopLists.add(this);

    this.created = new UserDate(json['created']);
    (<number[]> json['instances']).map(id => ItemInstancesList.ALL[id])
      .forEach(ii => this.addNewInstance(ii));
  }

  public addNewInstance(instance: ItemInstance): void {
    this.instances.add(instance);
    instance.shopList = this;
  }


  get simpleString(): string {
    return this.shopName + ' ' + this.created.simpleDateString;
  }


  get sumPrice(): number {
    let result = 0;
    this.instances.filter(ii => ii.price != undefined).map(ii => ii.price.getAmount()).forEach(a => result + a);
    return result;
  }

}


export class ShopListList extends PlaceElementList<ShopList> {

  public static readonly ALL = new ShopListList();

  constructor(json?: JSON[]) {
    super();
    if(json == null) return;

    json.map(j => new ShopList(j))
        .forEach(l => this.add(l));
  }


  public filterByStatus(status: boolean): ShopListList {
    let result = new ShopListList();
    if(status == null)
      this.forEach(l => result.add(l));
    else
      this.filter(l => l.status == status).forEach(l => result.add(l));
    return result;
  }

}

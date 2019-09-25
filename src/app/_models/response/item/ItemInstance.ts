import {Entity} from '../Entity';
import {LocalDate} from '../../../_util/date/JavaLocalDate';
import {ItemInstancesList} from './ItemInstancesList';
import {WishListItem} from "../WishListItem";
import {Container, ContainersList} from "../Container";
import {PlaceUsersList} from "../place-user/PlaceUsersList";
import {KeyName} from "../KeyName";
import {Money} from "ts-money";
import {UserDate} from "../../util/UserDate";

export class ItemInstance extends Entity {

  price: Money;

    comment: string;
    expireOn: LocalDate;

    itemId: number;
  container: Container;

  added: UserDate;
  opened: UserDate;
  frozen: UserDate;
  deleted: UserDate;

  wishListItem: WishListItem;
  shopList: any;

    constructor(json?: JSON) {
      super();

      if (json == undefined) return;

      this.id = json['id'];
      ItemInstancesList.ALL.add(this);

      if (json['price'])
        this.price = Money.fromDecimal(json['price']['amount'], json['price']['currency']);

      this.comment = json['comment'];

      if(json['expireOn'])
        this.expireOn = new LocalDate(json['expireOn']);

      this.itemId = json['itemId'];

      this.container = ContainersList.ALL[json['containerId']];
      this.container.instances.add(this);

      this.added = new UserDate(json['added']);
      this.opened = new UserDate(json['opened']);
      this.frozen = new UserDate(json['frozened']);
      this.deleted = new UserDate(json['deleted']);

    }

    public isOpen(): boolean {
      return !this.opened.isEmpty();
    }

    public isDeleted(): boolean {
      return !this.deleted.isEmpty();
    }


}

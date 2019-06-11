import {WishListItem} from "./WishListItem";
import {KeyName} from "./KeyName";

export class WishList extends KeyName {

    public status: boolean;

    public description: string;
    public placeId: number;

    public wishListItems: WishListItem[];

    public constructor(json?: JSON | JSON[]) {
      super();

      if (json == undefined)
        return;

      json = json instanceof Array ? json[0] : json;

      this.id = json['id'];
      this.placeId = json['placeId'];
      this.status = json['status'];

      this.name = json['name'];
      this.description = json['description'];

      this.wishListItems = json['items'].map(WishListItem);

    }

    public pushNewItem(listItem: WishListItem) {
        this.wishListItems.push(listItem);
    }

}


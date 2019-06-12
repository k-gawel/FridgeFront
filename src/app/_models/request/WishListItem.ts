import {Entity} from './Entity';
import {WishList} from './WishList';
import {Item} from './item/Item';
import {Category} from './Category';
import {KeyName} from './KeyName';
import {ItemInstance} from './item/ItemInstance';

export class WishListItem extends Entity {

    public author: number | KeyName;
    public createdOn: Date;
    public addedBy: number | KeyName;
    public wishList: number | WishList;
    public addedOn: Date;
    public addedInstance: number | ItemInstance;
    public comment: string;
    public category: number | Category;
    public item: number | Item;

    constructor(json?: JSON | JSON[]) {
      super();

      if(json == undefined)
        return;

      json = json instanceof Array ? json[0] : json;

      this.id = json['id'];
      this.wishList = json['wishListId'];
      this.author = json['authorId'];
      this.createdOn = new Date(json['createdOn']);

      this.addedBy = json['addedById'];
      if(json['addedOn'])
        this.addedOn = new Date(json['addedOn']);
      this.addedInstance = json['addedInstanceId'];

      if(json['categoryId'])
        this.category = Category.getById(json['categoryId']);
      if(json['itemId'])
        this.item = json['itemId'];
      this.comment = json['comment'];

    };

}


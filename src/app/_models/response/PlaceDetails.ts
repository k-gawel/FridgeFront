import {KeyName, KeyNameList} from './KeyName';
import {PlaceUsersList} from './place-user/PlaceUsersList';
import {Container, ContainersList} from './Container';
import {PlaceUser} from './place-user/PlaceUser';
import {WishList, WishListList} from './WishList';
import {ShopList, ShopListList} from "./ShopList";

export class PlaceDetails extends KeyName {

    adminId: number;

  containers: ContainersList = new ContainersList();
  users: PlaceUsersList = new PlaceUsersList();

  wishLists: WishListList = new WishListList();
  shopLists: ShopListList = new ShopListList();

    constructor(json?: JSON) {
      super();
      if (json == undefined) return;

      this.id = json['id'];
      PlaceDetailsList.ALL.add(this);

      this.name = json['name'];
      this.adminId = json['adminId'];

      this.users.addAll(new PlaceUsersList(json['users']));
      (<JSON[]> json['containers']).forEach(j => new Container(j));
      (<JSON[]> json['wishLists']).forEach(j => new WishList(j));
      (<JSON[]> json['shopLists']).forEach(j => new ShopList(j));
    }


    public addUser(user: KeyName): PlaceUser {
      let placeUser: PlaceUser = this.users[user.id];
      if(placeUser != null) {
        placeUser.status = true;
      } else {
        placeUser = new PlaceUser();
        placeUser.id = user.id;
        placeUser.name = user.name;
        placeUser.status = true;
      }
      return placeUser;
    }


    public removeUser(user: KeyName | number) {
      let placeUser: PlaceUser = this.users[user instanceof KeyName ? user.id : user];
      if(placeUser != null)
        placeUser.status = false;
    }

}

export class PlaceDetailsList extends KeyNameList<PlaceDetails> {

  public static readonly ALL: PlaceDetailsList = new PlaceDetailsList();


    constructor(json?: JSON[]) {
      super();

      if(json == undefined)
        return;

      json.forEach((element: JSON) => this.add(new PlaceDetails(element)));
    }


  public getContainers(): ContainersList {
    const result = new ContainersList();
    this.forEach(p => result.addAll(p.containers));
    return result;
  }

}

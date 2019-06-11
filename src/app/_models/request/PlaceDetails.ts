import { KeyName, KeyNameList } from "./KeyName";
import {PlaceUsersList} from "./place-user/PlaceUsersList";
import {ContainersList} from "./Container";
import {PlaceUser} from "./place-user/PlaceUser";

export class PlaceDetails extends KeyName{

    adminId: number;

    containers: ContainersList;
    users: PlaceUsersList;

    constructor(json?: JSON) {
      super();

      if(json == undefined)
        return;

      this.id = json['id'];
      this.name = json['name'];
      this.adminId = json['adminId'];

      this.containers = new ContainersList(json['containers']);
      this.users = new PlaceUsersList(json['users']);
    }


    public addUser(user: KeyName): PlaceUser {
      let placeUser: PlaceUser = this.users.getById(user.id);
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
      let placeUser: PlaceUser = this.users.getById(user instanceof KeyName ? user.id : user);
      if(placeUser != null)
        placeUser.status = false;
    }

}

export class PlaceDetailsList extends KeyNameList {

    public list: PlaceDetails[];
    public static ALL: PlaceDetailsList = new PlaceDetailsList();

    constructor(json?: JSON[]) {
      super();

      if(json == undefined)
        return;

      json.forEach((element: JSON) => {
        this.list.push(new PlaceDetails(element));
      });

    }


    public static getById(id: number) {
        return this.ALL.getById(id);
    }

}

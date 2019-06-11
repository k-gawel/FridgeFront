import {KeyName} from "../KeyName";
import {PlaceUsersList} from "./PlaceUsersList";

export class PlaceUser extends KeyName {

  status: boolean;

  constructor(json?: JSON) {
    super();

    if (json == undefined)
      return;

    this.id = json['id'];
    this.name = json['name'];
    this.status = json['status'];

    PlaceUsersList.ALL.push(this);
  }

}

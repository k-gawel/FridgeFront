import {KeyName} from '../KeyName';
import {PlaceUsersList} from './PlaceUsersList';

export class PlaceUser extends KeyName {

  status: boolean;

  static clone(kn: KeyName | PlaceUser, status?: boolean) {
    let result = <PlaceUser> super.clone(kn);
    if(kn instanceof PlaceUser)
      result.status = kn.status;
    else
      result.status = status != null ? status : true;
    return result;
  }

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

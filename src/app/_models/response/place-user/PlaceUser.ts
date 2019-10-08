import {KeyName} from '../KeyName';
import {PlaceUsersList} from './PlaceUsersList';
import {PlaceUserStats} from './PlaceUserStats';
import {PlaceDetails} from "../PlaceDetails";

export class PlaceUser extends KeyName {

  status: boolean;
  stats:  PlaceUserStats;

  static added(kn: KeyName, place: PlaceDetails, status?: boolean): PlaceUser {
    if(status == null)
      status = true;

    let result;
    if(place.users[kn.id] != null) {
      result = place.users[kn.id];
      result.status = true;
    } else {
      result = new PlaceUser();
      result.id = kn.id;
      result.name = kn.name;
      result.status = PlaceUserStats.create(kn.id);
      place.users.add(result);
    }

    return result;
  }

  constructor(json?: JSON) {
    super();

    if (json == undefined) {
      return;
    }

    this.id = json['id'];
    PlaceUsersList.ALL.add(this);

    this.name = json['name'];
    this.status = json['status'];
    this.stats  = new PlaceUserStats(json['stats']);
  }

}

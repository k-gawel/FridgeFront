import {KeyName} from '../KeyName';
import {PlaceUsersList} from './PlaceUsersList';
import {PlaceUserStats} from './PlaceUserStats';

export class PlaceUser extends KeyName {

  status: boolean;
  stats:  PlaceUserStats;

  static clone(kn: KeyName | PlaceUser, status?: boolean) {
    let result = <PlaceUser> super.clone(kn);
    if(kn instanceof PlaceUser) {
      result.status = kn.status;
      result.stats  = kn.stats;
    }
    else {
      result.status = status != null ? status : true;
      result.stats  = PlaceUserStats.create(kn.id);
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

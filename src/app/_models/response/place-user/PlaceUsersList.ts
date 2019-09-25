import {KeyName, KeyNameList} from '../KeyName';
import {PlaceUser} from './PlaceUser';
import {Entity} from "../Entity";

export class PlaceUsersList extends KeyNameList<PlaceUser> {

  public static ALL: KeyNameList<KeyName> = new KeyNameList<KeyName>();

  constructor(json?: JSON[]) {
    super();
    if (json == null) return;

    json.map(j => new PlaceUser(j))
      .forEach(u => this.add(u));
  }


  public searchByName(name: string): PlaceUsersList {
    return <PlaceUsersList> super.searchByName(name);
  }


  public getByStatus(status: boolean): PlaceUsersList {
    return <PlaceUsersList> this.filter(p => p.status === status);
  }

}


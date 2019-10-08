import {KeyName, KeyNameList} from '../KeyName';
import {PlaceUser} from './PlaceUser';

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


  public getByStatus(status?: boolean): PlaceUsersList {
    let result = new PlaceUsersList();
    if(status == null)
      this.forEach(u => result.add(u));
    else
      this.filter(u => u.status == status).forEach(u => result.add(u));
    return result;
  }

}


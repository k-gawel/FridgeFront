import {KeyNameList} from '../KeyName';
import {PlaceUser} from './PlaceUser';

export class PlaceUsersList extends KeyNameList {

    public list: PlaceUser[];
    public static ALL: KeyNameList = new KeyNameList();

    constructor(json?: JSON[]) {
        super();
        this.list = [];

        if(json == undefined)
          return;

        json.forEach( (element: JSON) => {
          this.list.push(new PlaceUser(element));
        })

    }


    public push(user: PlaceUser): PlaceUsersList {

      let existing: PlaceUser = this.getById(user.id);

      if(existing == null)
        this.list.push(user);
      else {
        existing.name = user.name;
        existing.status = user.status;
      }

      return this;
    }


    public getById(id: number): PlaceUser {
      return <PlaceUser> super.getById(id);
    }


    public searchByName(name: string): PlaceUsersList {
      return <PlaceUsersList> super.searchByName(name);
    }


    public getByStatus(status: boolean): PlaceUsersList {
        let result: PlaceUsersList = new PlaceUsersList;

        for(let user of this.list) {
            if(user.status === status)
                result.push(user);
        }

        return result;
    }

}


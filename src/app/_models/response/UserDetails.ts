import {KeyName, KeyNameList} from './KeyName';

export class UserDetails extends KeyName {

    private email: string;

    constructor(json?: JSON) {
      super();

      if(json == undefined)
        return;

      super(json);
      this.email = json['email'];

    }

    public static fromJSON(json: JSON): UserDetails {
        let result = new UserDetails();
        result.id = json['id'];
        result.name = json['name'];
        result.email = json['email'];
        UserDetailsList.USERS.push(<KeyName> result);
        return result;
    }

    public isNull(): boolean {
        return this.id == null || this.name == null || this.email == null;
    }

    getId(): number {
        return this.id;
    }
}

export class UserDetailsList extends KeyNameList {

    public static USERS: KeyNameList = new KeyNameList();

    constructor(json?: JSON[]) {
      super();


    }

    public static fromJSON(json: JSON[]): UserDetailsList {

        var result: KeyNameList = new KeyNameList();

        json.forEach( (element: JSON) => {
            var userDetails = UserDetails.fromJSON(element);
            result.push(userDetails);
            let userKeyName = new KeyName();
            userKeyName.id = userDetails.id;
            userKeyName.name = userDetails.name;
        })

        return result;

    }

}

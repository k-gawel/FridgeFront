import {LocalDate} from "../../_util/date/JavaLocalDate";
import {PlaceUsersList} from "../response/place-user/PlaceUsersList";
import {KeyName} from "../response/KeyName";

export class UserDate {

  public user: KeyName;
  public date: LocalDate;

  constructor(firstArg?: JSON | KeyName | number, date?: LocalDate) {
    if (firstArg == undefined) return;

    if (typeof firstArg === 'number') {
      this.user = PlaceUsersList.ALL[firstArg];
      this.date = date == undefined ? new LocalDate() : date;
    } else if (firstArg instanceof KeyName) {
      this.user = firstArg;
      this.date = date == undefined ? new LocalDate() : date;
    } else {
      this.user = PlaceUsersList.ALL[firstArg['account']];
      this.date = new LocalDate(firstArg['date']);
    }

  }

  isEmpty(): boolean {
    return this.user == null && this.date == null;
  }

  get name(): string {
    return this.user != undefined ? this.user.name : null;
  }

  get id(): number {
    return this.user != undefined ? this.user.id : null;
  }

  get dateToString(): string {
    return this.date != undefined ? this.date.toString() : null;
  }

  get simpleDateString(): string {
    return this.date != undefined ? this.date.toSimpleString() : null;
  }

}

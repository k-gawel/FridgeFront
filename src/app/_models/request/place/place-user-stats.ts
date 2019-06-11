import {Entity, EntityList} from "../Entity";

export class PlaceUserStats extends Entity {

  private _instancesAdded: number;
  private _instancesOpened: number;
  private _instancesDeleted: number;

  constructor(json?: JSON) {
    super();
    if(json == undefined)
      return;

    this.id = json['userId'];
    this._instancesAdded = json['instancesAdded'];
    this._instancesOpened = json['instancesOpened'];
    this._instancesDeleted = json['instancesDeleted'];
  }


  get instancesAdded(): number {
    return this._instancesAdded;
  }

  set instancesAdded(value: number) {
    this._instancesAdded = value;
  }

  get instancesOpened(): number {
    return this._instancesOpened;
  }

  set instancesOpened(value: number) {
    this._instancesOpened = value;
  }

  get instancesDeleted(): number {
    return this._instancesDeleted;
  }

  set instancesDeleted(value: number) {
    this._instancesDeleted = value;
  }

}

export class PlaceUserStatsList extends EntityList {

  public list: PlaceUserStats[] = [];

  constructor(json?: JSON[]) {
    super();

    if(json == undefined)
      return;

    json.forEach((element: JSON) => {
      this.list.push(new PlaceUserStats(element));
    })

  }


  public getById(id: number): PlaceUserStats {
    return <PlaceUserStats> super.getById(id);
  }
}

import {Entity, EntityList} from '../Entity';

export class PlaceUserStats extends Entity {

  instancesAdded: number;
  instancesOpened: number;
  instancesDeleted: number;

  static create(id: number, added?: number, open?: number, deleted?: number): PlaceUserStats {
    let result = new PlaceUserStats();
    result.id = id;
    result.instancesAdded = added != null ? added : 0;
    result.instancesOpened = open != null ? open : 0;
    result.instancesDeleted = deleted != null ? deleted : 0;
    return result;
  }

  constructor(json?: JSON) {
    super(json);

    if(json == undefined)
      return;

    this.instancesAdded   = json['instancesAdded'];
    this.instancesOpened  = json['instancesOpened'];
    this.instancesDeleted = json['instancesDeleted'];
  }

}

export class PlaceUserStatsList extends EntityList {

  public list: PlaceUserStats[] = [];

  constructor(json?: JSON[]) {
    super();

    if(json != undefined)
      this.list = json.map(j => new PlaceUserStats(j));
  }

  public getById(id: number): PlaceUserStats {
    return <PlaceUserStats> super.getById(id);
  }

}

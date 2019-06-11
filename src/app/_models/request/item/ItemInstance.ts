import {Entity} from "../Entity";
import {LocalDate} from "../../../_util/date/JavaLocalDate";

export class ItemInstance extends Entity {

    comment: string;
    expireOn: LocalDate;

    itemId: number;
    containerId: number;

    addedById: number;
    addedOn: LocalDate;

    openById: number;
    openOn: LocalDate;

    frozenById: number;
    frozenOn: LocalDate;

    deletedById: number;
    deletedOn: LocalDate;


    constructor(json?: JSON) {
      super();

      if (json == undefined)
        return;

      this.id = json['id'];
      this.comment = json['comment'];
      if(json['expireOn'])
        this.expireOn = new LocalDate(json['expireOn']);

      this.itemId = json['itemId'];

      this.containerId = json['containerId'];

      this.addedById = json['addedById'];
      if(json['addedOn'])
        this.addedOn = new LocalDate(json['addedOn']);

      this.openById = json['openById'];
      if(json['openOn'])
        this.openOn = new LocalDate(json['openOn']);

      this.frozenById = json['frozenById'];
      if(json['frozenOn'])
        this.frozenOn = new LocalDate(json['frozenOn']);

      this.deletedById = json['deletedById'];
      if(json['deletedOn'])
        this.deletedOn = new LocalDate(json['deletedOn']);
    }


    public isOpen(): boolean {
      return this.openOn != null;
    }


    public isDeleted(): boolean {
      return this.deletedOn != null;
    }


}

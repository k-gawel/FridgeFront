import {KeyName, KeyNameList} from "./KeyName";
import {PlaceDetails} from "./PlaceDetails";
import {Entity, EntityList} from "./Entity";
import {IdSelector} from "../../_service/utils/EntitySelector";

export class PlaceElement extends KeyName {

  public place: PlaceDetails;

}


export class PlaceElementList<T extends PlaceElement> extends KeyNameList<T> {


  public getByPlaces(places: number | Entity | number[] | EntityList<T>): PlaceElementList<T> {
    let ids = new IdSelector(places).id;
    return <PlaceElementList<T>> this.filter(c => ids.includes(c.place.id));
  }


  public getPlace(): PlaceDetails {
    if (this.size() == 0) return null;
    let firstPlace = this.first().place;

    if (this.filter(i => i.place.equals(firstPlace)).size() == this.size())
      return firstPlace;
    else
      return null;
  }


}


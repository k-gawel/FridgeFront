import { KeyName, KeyNameList } from "./KeyName";
import { PlaceDetails, PlaceDetailsList } from "./PlaceDetails";
import {Entity, EntityList} from "./Entity";

export class Container extends KeyName{

    place: number;

    constructor(json?: JSON) {
      super();

      if(json == undefined)
        return;

      this.id = json['id'];
      this.name = json['name'];
      this.place = json['placeId'];
      ContainersList.ALL.push(this);
    }

}

export class ContainersList extends KeyNameList{

    public list: Container[] = [];
    public static ALL: ContainersList = new ContainersList();


    constructor(json?: JSON[]) {
      super();

      if(json == null)
        return;

      json.forEach((element: JSON) => {
        this.list.push(new Container(element));
      })

    }


    public push(container: Container): ContainersList {

      let existingContainer = this.getById(container.id);

      if(existingContainer == null)
        this.list.push(container);
      else {
        existingContainer.name = container.name;
        existingContainer.place = container.place;
      }

      return this;
    }


    public getById(id: number): Container {
      return <Container> super.getById(id);
    }


    public getByIds(ids: number[]): ContainersList {
      return <ContainersList> super.getByIds(ids);
    }


    public getByPlaces(places: number | Entity | number[] | EntityList): ContainersList {

      let placeIds: number[] = [];

      if(typeof places === 'number')
        placeIds.push(places);
      else if(places instanceof Entity)
        placeIds.push(places.id);
      else if(places instanceof EntityList)
        placeIds = places.getAllIds();

      let result = new ContainersList();
      result.list = this.list.filter(e => placeIds.includes(e.place));

      return result;
    }


}

import {KeyName, KeyNameList} from './KeyName';
import {Entity, EntityList} from './Entity';
import {ItemInstancesList} from './item/ItemInstancesList';
import {IdSelector} from '../../_service/utils/EntitySelector';
import {ItemInstance} from './item/ItemInstance';
import {PlaceDetails, PlaceDetailsList} from './PlaceDetails';

export class Container extends KeyName {
    place: number;
    instances: ItemInstancesList;

    constructor(json?: JSON) {
      super();

      if(json == undefined)
        return;

      this.id = json['id'];
      this.name = json['name'];
      this.place = json['place_id'];
      this.instances = new ItemInstancesList(json['instances']);

      ContainersList.ALL.push(this);
    }
}

export class ContainersList extends KeyNameList {

    public list: Container[] = [];
    public static ALL: ContainersList = new ContainersList();


    constructor(json?: JSON[]) {
      super();

      if(json == null)
        return;

      this.list = json.map(j => new Container(j));
    }


    public push(container: Container): ContainersList {
      let existingContainer = this.getById(container.id);

      if(existingContainer == null)
        this.list.push(container);
      else {
        existingContainer.name = container.name;
        existingContainer.place = container.place;
        existingContainer.instances = container.instances;
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
      let ids = new IdSelector(places).id;

      const result = new ContainersList();
      result.list = this.list.filter(e => ids.includes(e.place));
      return result;
    }


    public getAllInstances(): ItemInstancesList {
      let list: ItemInstance[][] = this.list.map(c => c.instances.toArray());
      let result = new ItemInstancesList();
      list.forEach(l => l.forEach(ii => result.addInstance(ii)));
      return result;
    }


    public getPlace(): PlaceDetails {
      if(this.list.length == 0) return null;

      let firstID = this.list[0].place;

      if(this.list.filter(i => i.place == firstID).length == this.list.length)
        return PlaceDetailsList.ALL.getById(firstID);
      else
        return null;
    }

}

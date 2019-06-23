import {KeyName, KeyNameList} from './KeyName';
import {Entity, EntityList} from './Entity';
import {ItemInstancesList} from './item/ItemInstancesList';
import {IdSelector} from '../../_service/utils/EntitySelector';

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


}

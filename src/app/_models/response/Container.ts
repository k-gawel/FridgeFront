import {ItemInstancesList} from './item/ItemInstancesList';
import {ItemInstance} from './item/ItemInstance';
import {PlacesList} from './Place';
import {PlaceElement, PlaceElementList} from "./PlaceElement";

export class Container extends PlaceElement {

  instances: ItemInstancesList = new ItemInstancesList();

  constructor(json?: JSON) {
    super();
    if (json == undefined) return;

    this.id = json['id'];
    ContainersList.ALL.add(this);

    this.name = json['name'];

    this.place = PlacesList.ALL[json['place_id']];
    this.place.containers.add(this);

    (<JSON[]> json['instances']).forEach(j => new ItemInstance(j));
  }

}

export class ContainersList extends PlaceElementList<Container> {

    public static ALL: ContainersList = new ContainersList();

    constructor(json?: JSON[]) {
      super();
      if (json == null) return;

      json.forEach(j => this.add(new Container(j)));
    }


    public getAllInstances(): ItemInstancesList {
      let result = new ItemInstancesList();
      this.map(c => c.instances).forEach(i => result.addAll(i));
      return result;
    }


}

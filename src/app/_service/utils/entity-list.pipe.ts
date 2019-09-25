import {Pipe, PipeTransform} from '@angular/core';
import {Entity, EntityList} from "../../_models/response/Entity";

@Pipe({
  name: 'entityList',
  pure: false
})
export class EntityListPipe implements PipeTransform {

  transform<T extends Entity>(value: EntityList<T>, args?: any): T[] {
    let values = [];
    value.forEach(e => values.push(e));
    return values;
  }

}

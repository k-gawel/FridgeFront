import {Form} from './Form';

export class PlaceForm extends Form {

  name: String;

  validate(): boolean {
    super.validate()
    return true;
  }

  //TODO PlaceForm validations



}

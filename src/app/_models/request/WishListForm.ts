import {Form} from './Form';

export class WishListForm extends Form {

  name: string;
  authorId: number;
  placeId: number;
  description: string;

  validate(): boolean {
    super.validate();
    return this.validateName() && this.validatePlace() && this.validateDescription();
  }

  validateName(): boolean {

    if (this.name == null || this.name == '') {
      this.sendMessage("name.null");
      return false;
    }

    if (this.name.length < 5) {
      this.sendMessage("name.short");
      return false;
    }

    if (this.name.length > 30) {
      this.sendMessage("name.long");
      return false;
    }

    return true;

  }

  validatePlace(): boolean {

    if (this.placeId == null) {
      this.sendMessage("placeId.null");
      return false;
    }

    if (typeof this.placeId !== 'number') {
      this.sendMessage("placeId.notnumber");
      return false;
    }

    return true;

  }

  validateDescription(): boolean {

    if (this.description.length > 10000) {
      this.sendMessage("description.long");
      return false;
    }

    return true;

  }

}

import {Form} from './Form';
import {Capacity} from "../response/item/Item";

export class ItemForm extends Form {

  name: string;
  barcode: number;

  placeId: number;
  categoryId: number;
  producer: string;

  description: string;
  storage: string;
  capacity: Capacity = new Capacity();

  ingredients: Set<string> = new Set();
  allergens: Map<string, boolean> = new Map();
  nutrition: NutritionForm = new NutritionForm();

    validate(): boolean {
      super.validate();
      return true;
    }

    //TODO ItemForm Validator


}


export class AllergenForm extends Form {

    name: string;
    contains: boolean;

    constructor() {
      super();
      this.contains = true;
    }

    validate(): boolean {
      return true;
    }

}

export class NutritionForm extends Form {

    energy: number;
    fat: number;
    saturatedFat: number;
    carbohydrate: number;
    sugar: number;
    protein: number;
    salt: number;

    validate(): boolean {
      super.validate();
      return true;
    }

}

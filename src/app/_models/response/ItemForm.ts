import {Form} from "./Form";

export class ItemForm extends Form {

  name: string;
  barcode: number;

  placeId: number;
  categoryId: number;
  producer: ProducerForm = new ProducerForm();

  description: string;
  storage: string;
  netWeight: number;

  ingredients: IngredientForm[] = [];
  allergens: AllergenForm[] = [];
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


export class ProducerForm extends Form {

    name: string;

    validate(): boolean {
      return true;
    }

}


export class IngredientForm extends Form {

    name: string;

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

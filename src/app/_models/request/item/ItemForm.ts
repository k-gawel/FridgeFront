import {Form} from '../Form';
import {Capacity} from "../../response/item/Item";
import {Length, Min} from "class-validator";
import {FormErrors} from "../FormError";
import {ItemFormErrors} from "./ItemFormErrors";
import {ItemFormErrorMessages} from "./ItemFormErrorMessages";
import {FormErrorMessages} from "../FormErrorMessages";
import {ErrorCode} from "../ErrorCode";

export class ItemForm extends Form {

  @Length(5, 255, { message: ErrorCode.NAME.LENGTH } )
  name: string;
  barcode: number;

  @Min(0, { message: ErrorCode.PLACE.NULL })
  placeId: number;

  @Min(0, { message: ErrorCode.CATEGORY.NULL } )
  categoryId: number;


  producer: string;

  @Length(5, 1500, { message: ErrorCode.DESCRIPTION.LENGTH } )
  description: string;
  storage: string;
  capacity: Capacity = new Capacity();

  ingredients: Set<string> = new Set();
  allergens: Map<string, boolean> = new Map();
  nutrition: NutritionForm = new NutritionForm();

  private static readonly _messages = new ItemFormErrorMessages();
  private _errors = new ItemFormErrors();

  get errors(): FormErrors {
    return this._errors;
  }

  get messages(): FormErrorMessages {
    return ItemForm._messages;
  }

  restartErrors(): void {
    this._errors = new ItemFormErrors();
  }


}


export class AllergenForm {
    name: string;
    contains: boolean = true;
}



export class NutritionForm {

    energy: number;
    fat: number;
    saturatedFat: number;
    carbohydrate: number;
    sugar: number;
    protein: number;
    salt: number;

}

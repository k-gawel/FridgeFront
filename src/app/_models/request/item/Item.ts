import {KeyName} from '../KeyName';
import {Category} from '../Category';
import {Producer} from './Producer';
import {Entity} from '../Entity';


export class Item extends KeyName {

    barcode: number;

    placeId: number;
    category: Category;
    producer: Producer;

    description: string;
    storage: string;
    netWeight: number;

    allergens: Allergen[];
    ingredients: Ingredient[];
    nutrition: Nutrition;


    constructor(json?: JSON) {
      super();

      if(json == undefined)
        return;

        this.id = json['id'];
        this.name = json['name'];
        this.barcode = json['barcode'];

        this.placeId = json['placeId'];
        this.category = Category.getById(json['categoryId']);
        this.producer = new Producer(json['producer']);

        this.description = json['description'];
        this.storage = json['storage'];
        this.netWeight = json['netWeight'];

        this.allergens = json['allergens'].map(a => new Allergen(a));
        this.ingredients = json['ingredients'].map(i => new Ingredient(i));
        this.nutrition = new Nutrition(json['nutrition']);

    }

}

export class Allergen extends KeyName {

  contains: boolean;

  constructor(json?: JSON) {
    super();

    if(json == undefined)
      return;

    this.id = json['id'];
    this.name = json['name'];
    this.contains = json['contains'];
  }

}

export class Ingredient extends KeyName {

  constructor(json?: JSON) {
    super();

    if(json == undefined)
      return;

    this.id = json['id'];
    this.name = json['name'];
  }

}

export class Nutrition extends Entity {

    energy: number;
    fat: number;
    saturatedFat: number;
    carbohydrate: number;
    sugar: number;
    protein: number;
    salt: number;


    constructor(json?: JSON) {
      super();

      if(json == null)
        return;

      this.energy = json['energy'];
      this.fat = json['fat'];
      this.saturatedFat = json['saturatedFat'];
      this.carbohydrate = json['carbohydrate'];
      this.sugar = json['sugar'];
      this.protein = json['protein'];
      this.salt = json['salt'];

    }


}

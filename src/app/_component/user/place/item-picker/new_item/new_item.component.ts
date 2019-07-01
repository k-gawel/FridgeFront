import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Category} from '../../../../../_models/response/Category';
import {PlaceDetails} from '../../../../../_models/response/PlaceDetails';
import {Item} from '../../../../../_models/response/item/Item';
import {AllergenForm, IngredientForm, ItemForm} from '../../../../../_models/request/ItemForm';
import {ErrorMessage} from '../../../../../_models/util/ErrorMessage';
import {ItemService} from '../../../../../_service/user/item/item/item.service';


@Component({
    selector: 'new-item-form',
    templateUrl: './new_item.component.html',
    styleUrls: ['./new-item.component.css']
})
export class NewItemComponent implements OnInit, OnDestroy{

    @Input() chosenCategory: Category;
    @Input() place: PlaceDetails;
    @Input() name: string = null;
    @Input() barcode: number = null;

    @Output() newItem = new EventEmitter<Item>();

    form: ItemForm = new ItemForm();
    newAllergen: AllergenForm = new AllergenForm();
    newIngredient: IngredientForm = new IngredientForm();
    errors: ErrorMessage;

    constructor(private itemService: ItemService) {
    }

    ngOnInit() {
        this.form.name = this.name;
        this.form.barcode = this.barcode;
        this.form.placeId = this.place.id;
        this.form.categoryId = this.chosenCategory.id;
    }

    ngOnDestroy() {
    }

    submit() {
      this.form.errors = new ErrorMessage("");

      this.itemService.newItem(this.form)
        .then((result: Item) => {
          this.newItem.emit(result);
        })
        .catch((e: ErrorMessage) => this.errors = e );
    }

    addIngredient() {
      for(let ingredient of this.form.ingredients)
        if(ingredient.name == this.newIngredient.name)
          return;

      this.form.ingredients.push(this.newIngredient);
      this.newIngredient = new IngredientForm();
    }

    removeIngredient(ingredient: IngredientForm) {
      const index = this.form.ingredients.indexOf(ingredient);
      if(index > -1)
        this.form.ingredients.splice(index, 1);
    }

    addAllergen() {
      for(let allergen of this.form.allergens)
        if(allergen.name == this.newAllergen.name)
          return;

      this.form.allergens.push(this.newAllergen);
      this.newAllergen = new AllergenForm();
    }

    removeAllergen(allergen: AllergenForm) {
      const index = this.form.allergens.indexOf(allergen);
      if(index > -1)
        this.form.allergens.splice(index, 1);
    }

}


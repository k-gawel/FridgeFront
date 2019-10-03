import {Component, Inject, Input} from '@angular/core';
import {Category} from '../../../../../../_models/response/Category';
import {PlaceDetails} from '../../../../../../_models/response/PlaceDetails';
import {Item} from '../../../../../../_models/response/item/Item';
import {AllergenForm, ItemForm} from '../../../../../../_models/request/item/ItemForm';
import {ErrorMessage} from '../../../../../../_models/util/ErrorMessage';
import {ItemService} from '../../../../../../_service/user/item/item/item.service';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

export interface NewItemDatas {
  place: PlaceDetails,
  category: Category,
  barcode: number,
  name: string
}

export interface AllergenForm {
  name: string,
  contains: boolean;
}

@Component({
    selector: 'new-item-form',
    templateUrl: './new_item.component.html',
    styleUrls: ['./new-item.component.css']
})
export class NewItemComponent {

  place: PlaceDetails;

  @Input() name: string = null;
  @Input() barcode: number = null;

  form: ItemForm;
  newAllergen: AllergenForm;

  errors: ErrorMessage;

  constructor(private itemService: ItemService,
              public dialogRef: MatDialogRef<NewItemComponent>,
              @Inject(MAT_DIALOG_DATA) public data: NewItemDatas) {
    this.form = new ItemForm();
    this.newAllergen = new AllergenForm();

    this.form.category = data.category.id;
    this.form.place = data.place.id;
    this.form.name = data.name;
    this.form.barcode = data.barcode;
  }


  submit() {
    this.form.validate();

    this.itemService.newItem(this.form)
      .then((result: Item) => this.dialogRef.close(result))
      .catch((e: ErrorMessage) => this.errors = e);
  }


  addAllergen(name: string) {
    this.form.allergens.set(name, true);
  }


  removeAllergen(allergen: AllergenForm) {
    this.form.allergens.delete(allergen.name);
  }


  close() {
    this.dialogRef.close();
  }

}


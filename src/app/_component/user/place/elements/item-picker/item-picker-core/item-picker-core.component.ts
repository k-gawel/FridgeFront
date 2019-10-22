import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Place} from "../../../../../../_models/response/Place";
import {Item} from "../../../../../../_models/response/item/Item";
import {ItemsList} from "../../../../../../_models/response/item/ItemsList";
import {ItemService} from "../../../../../../_service/user/item/item/item.service";
import {RelatedItemsService} from "../../../../../../_service/user/item/relatedItems/related-items.service";
import {MatDialog} from "@angular/material";
import {Category} from "../../../../../../_models/response/Category";
import {ItemGetQuery} from "../../../../../../_models/request/item/ItemGetQuery";

@Component({
  selector: 'app-item-picker-core',
  styles: [':host { height: 100%; width: 100%; }'],
  template: `
    <app-items-list *ngIf="items != null" [place]="place" [items]="items" 
                    (selectedItem)="selectItem($event)">
    </app-items-list>

    <mat-spinner class="align-content-center" *ngIf="items == null"></mat-spinner>
  `
})
export class ItemPickerCoreComponent {

  @Input()  place: Place;
  @Output() selectedItem = new EventEmitter<Item>();

  items: ItemsList = new ItemsList();

  constructor(private itemService: ItemService,
              private relatedItemsService: RelatedItemsService,
              public dialog: MatDialog) {
  }

  @Input() set category(category: Category) {
    if(this._category.equals(category) || category == null) return;

    this._category = category;
    if(this._category.isFinal() && this._input == "")
      this.getRelatedItems();
    else
      this.input = this._input;
  }

  @Input() set input(value: string | number) {
    this._input = value;
    this.items = null;
    if(!value)
      this.getRelatedItems();
    else
      this.itemService.get(this.query).then(i => this.items = i);
  }

  selectItem(item: Item) {
    console.log("Selected item", item);
    this.selectedItem.emit(item);
  }


  async getRelatedItems() {
    this.items = this._category.isFinal() ?
                        await this.relatedItemsService.getAll(this._category.id, this.place.id) :
                        await this.relatedItemsService.getMostPopular(this._category.id, this.place.id);
  }

  private get query(): ItemGetQuery {
    return name !== undefined ? this.nameQuery(this.name) : this.barcodeQuery(this.barcode);
  }

  private barcodeQuery(barcode: number): ItemGetQuery {
    const query = new ItemGetQuery();
    query.barcode = barcode;
    query.places = [this.place.id];
    return query;
  }

  private nameQuery(name: string): ItemGetQuery {
    const query = new ItemGetQuery();
    query.name = name;
    query.places = [this.place.id];
    query.category = this._category.id;
    return query;
  }

  private _input: string | number;
  private _category: Category = Category.rootCategory;

  private get name(): string {
    return isNaN(Number(this._input)) ? <string> this._input : undefined;
  }

  private get barcode(): number {
    return !isNaN(Number(this._input)) ? <number> this._input : undefined;
  }

}

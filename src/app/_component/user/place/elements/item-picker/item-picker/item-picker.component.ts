import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ItemService} from '../../../../../../_service/user/item/item/item.service';
import {RelatedItemsService} from '../../../../../../_service/user/item/relatedItems/related-items.service';
import {ErrorMessage} from '../../../../../../_models/util/ErrorMessage';
import {Category} from '../../../../../../_models/response/Category';
import {PlaceDetails} from '../../../../../../_models/response/PlaceDetails';
import {ItemsList} from '../../../../../../_models/response/item/ItemsList';
import {Item} from '../../../../../../_models/response/item/Item';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NewItemDatas} from '../../item/new-item-form/new_item.component';
import {WindowService} from '../../../../../../_service/utils/window.service';
import {BarcodeScannerComponent} from '../barcode-scanner/barcode-scanner.component';
import {IdSelector} from "../../../../../../_service/utils/EntitySelector";
import {MatDialog} from "@angular/material";
import {DialogService} from "../../../../../../_service/utils/dialog.service";
import {ItemGetQuery} from "../../../../../../_models/request/item/ItemGetQuery";


@Component({
  selector: 'app-item-picker',
  templateUrl: './item-picker.component.html',
  styleUrls: ['./item-picker.component.css']
})
export class ItemPickerComponent  {

  constructor(private itemService: ItemService,
              private relatedItemsService: RelatedItemsService,
              private modalService: NgbModal,
              private windowService: WindowService,
              public dialog: MatDialog) {
  }

  @Input() closeable: boolean = false;


  errorMessage: ErrorMessage;
  textSearch: string | number = '';


  _category: Category = Category.rootCategory;
  @Input() set category(category: Category) {
    if(this._category.equals(category) || category == null)
      return;
    else
      this._category = category;

    if(this._category.isFinal() && this.textSearch == "")
      this.getRelatedItems();
    else
      this.onTextSearchChange();
  }


  @Input() place: PlaceDetails = new PlaceDetails();


  @Output() selectedItem = new EventEmitter<Item>();
  @Output() close = new EventEmitter();


  related: boolean = true;
  items: ItemsList;
  setItems(items: ItemsList, related: boolean) {
    this.items = items;
    this.related = related;
  }

  
  scanBarcode() {
    const modalRef = this.modalService.open(BarcodeScannerComponent);
    modalRef.componentInstance.barcode.subscribe(res => {
      this.textSearch = res;
      this.searchByBarcode(res);
      modalRef.close()
    });
    modalRef.componentInstance.close.subscribe(() => modalRef.close())
  }


  searchByBarcode(barcode: number) {
    let query = new ItemGetQuery();
    query.barcode = barcode;
    query.places = [this.place.id];

    this.itemService.get(query)
                    .then((items: ItemsList) => this.setItems(items, false) );
  }


  searchByName(name: string) {
    let query = new ItemGetQuery();
    query.name = name;
    query.places = [this.place.id];
    query.category = this._category.id;

    this.itemService.get(query)
                    .then((i: ItemsList) => this.setItems(i, false));
  }


  getRelatedItems() {
    this.items = null;

    if(this._category.isFinal())
      this.relatedItemsService.getAll(new IdSelector(this._category), new IdSelector(this.place), 100)
        .then(items => this.setItems(items, false));
    else
      this.relatedItemsService.getMostPopular(this._category, this.place)
        .then( (items: ItemsList) => this.setItems(items, true) )
        .catch( (e: ErrorMessage) => this.errorMessage = e );
  }

  
  onTextSearchChange() {
    this.items = null;

    if(this.textSearch.toString().length <= 4)
        this.getRelatedItems();
    else if(!isNaN(Number(this.textSearch)))
        this.searchByBarcode(Number(this.textSearch));
    else if(isNaN(Number(this.textSearch)))
        this.searchByName(String(this.textSearch));
  }

  
  createNewItem() {
    if (!this._category.isFinal())
      return;

    const formData = {
      category: this._category,
      place: this.place,
      name: isNaN(Number(this.textSearch)) ? this.textSearch : null,
      barcode: !isNaN(Number(this.textSearch)) ? null : this.textSearch
    };

    const dialogRef = DialogService.createItemFormComponent(this.dialog, <NewItemDatas> formData);
    dialogRef.afterClosed().subscribe(i => {
      if (i != null)
        this.selectedItem.emit(i);
    })
  }

}

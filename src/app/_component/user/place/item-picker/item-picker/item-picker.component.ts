import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ItemService} from '../../../../../_service/user/item/item/item.service';
import {RelatedItemsService} from '../../../../../_service/user/item/relatedItems/related-items.service';
import {ErrorMessage} from '../../../../../_models/util/ErrorMessage';
import {Category} from '../../../../../_models/response/Category';
import {PlaceDetails} from '../../../../../_models/response/PlaceDetails';
import {ItemsList} from '../../../../../_models/response/item/ItemsList';
import {Item} from '../../../../../_models/response/item/Item';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NewItemComponent} from '../new_item/new_item.component';
import {Size, WindowService} from '../../../../../_service/utils/window.service';
import {BarcodeScannerComponent} from '../barcode-scanner/barcode-scanner.component';
import {IdSelector} from "../../../../../_service/utils/EntitySelector";


@Component({
  selector: 'app-item-picker',
  templateUrl: './item-picker.component.html',
  styleUrls: ['./item-picker.component.css']
})
export class ItemPickerComponent  {

  constructor(private itemService: ItemService,
              private relatedItemsService: RelatedItemsService,
              private modalService: NgbModal,
              private windowService: WindowService) {
  }

  errorMessage: ErrorMessage;
  textSearch: string | number = '';


  _category: Category = new Category();
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
  selectItem(item: Item) {
    this.selectedItem.emit(item);
    if (this.windowService.$resize.value <= Size.MD)
      document.getElementById("item-picker-" + this.place.id).scrollIntoView({behavior: 'smooth', block: 'center'});
  }

  

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
    this.itemService.searchItemsByBarcode(barcode, this.place)
      .then((items: ItemsList) => this.setItems(items, false) )
      .catch((e: ErrorMessage) => this.errorMessage = e )
  }


  searchByName(name: string) {
    this.itemService.searchItemByName(name, this.place, this._category)
      .then(items => this.setItems(items, false) )
      .catch(e => this.errorMessage = e );
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
    if(!this._category.isFinal())
      return;

    const modalRef = this.modalService.open(NewItemComponent);
    modalRef.componentInstance.chosenCategory = this._category;
    modalRef.componentInstance.place = this.place;
    if(this.textSearch != null && typeof this.textSearch == 'number')
      modalRef.componentInstance.barcode = this.textSearch;
    if(this.textSearch != null && typeof this.textSearch == 'string')
      modalRef.componentInstance.name = this.textSearch;
  }

  
  closeErrors() {
    this.errorMessage = null;
  }


}

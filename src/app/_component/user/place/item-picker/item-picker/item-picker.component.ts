import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
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


@Component({
  selector: 'app-item-picker',
  templateUrl: './item-picker.component.html',
  styleUrls: ['./item-picker.component.css']
})
export class ItemPickerComponent implements OnInit {

  constructor(private itemService: ItemService,
              private relatedItemsService: RelatedItemsService,
              private modalService: NgbModal,
              private windowService: WindowService) {
  }

  errorMessage: ErrorMessage;

  _category: Category = new Category();
  @Input() set category(category: Category) {
    console.debug("ItemPickerComponent.setCategory()", category);
    if(this._category.equals(category) || category == null)
      return;

    this._category = category;
    this.onTextSearchChange();
  }

  _place: PlaceDetails = new PlaceDetails();
  @Input()
  set place(place: PlaceDetails) {
    this._place = place;
  }

  @Output() selectedItem = new EventEmitter<Item>();

  ngOnInit(): void {
  }


  textSearch: string | number = '';

  showRelatedItems: boolean = false;
  relatedItems: ItemsList;

  items: ItemsList;

  // PICKER FORM METHODS

  searchByBarcode(barcode: number) {
    this.itemService.searchItemsByBarcode(barcode, this._place)
      .then((items: ItemsList) => this.items = items )
      .catch((e: ErrorMessage) => this.errorMessage = e )
  }


  searchByName(name: string) {
    this.itemService.searchItemByName(name, this._place, this._category)
      .then(items => this.items = items )
      .catch(e => this.errorMessage = e );
  }


  getRelatedItems() {
    console.debug("ItemPicker.getRelatedItems()", this._category);
    this.relatedItemsService.getMostPopular(this._category, this._place)
      .then( (items: ItemsList) => {
        console.debug("ItemPicker.getRelatedItems().then()", items);
        this.relatedItems = items;
        console.debug("AFTER INITIALIZATION");
      } )
      .catch( (e: ErrorMessage) => {
        this.errorMessage = e;
        console.error(e);
      });

  }


  onTextSearchChange() {
    console.debug("ItemPicker.onTextSearchChange()");
    if(this.textSearch.toString().length <= 4) {
      console.debug("ItemPicker.onTextSearchChange() <=4");
        this.getRelatedItems();
        this.showRelatedItems = true;
    } else if(!isNaN(Number(this.textSearch))) {
      console.debug("ItemPicker.onTextSearchChange() number");
        let barcode = Number(this.textSearch);
        this.searchByBarcode(barcode);
        this.showRelatedItems = false;
    } else if(isNaN(Number(this.textSearch))) {
      console.debug("ItemPicker.onTextSearchChange() barcode")
        let name = String(this.textSearch);
        this.searchByName(name);
        this.showRelatedItems = false;
    }
  }

  createNewItem() {
    if(!this._category.isFinal())
      return;

    const modalRef = this.modalService.open(NewItemComponent);
    modalRef.componentInstance.chosenCategory = this._category;
    modalRef.componentInstance.place = this._place;
    if(this.textSearch != null && typeof this.textSearch == 'number')
      modalRef.componentInstance.barcode = this.textSearch;
    if(this.textSearch != null && typeof this.textSearch == 'string')
      modalRef.componentInstance.name = this.textSearch;
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

  closeErrors() {
    this.errorMessage = null;
  }


}

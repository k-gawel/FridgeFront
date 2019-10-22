import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Category} from '../../../../../../_models/response/Category';
import {Place} from '../../../../../../_models/response/Place';
import {ItemsList} from '../../../../../../_models/response/item/ItemsList';
import {Item} from '../../../../../../_models/response/item/Item';
import {NewItemDatas} from '../../item/new-item-form/new_item.component';
import {MatDialog} from "@angular/material";
import {DialogService} from "../../../../../../_service/utils/dialog.service";


@Component({
  selector: 'app-item-picker',
  templateUrl: './item-picker.component.html',
  styleUrls: ['./item-picker.component.css']
})
export class ItemPickerComponent implements OnInit {

  @Input() closeable: boolean = false;
  @Input() place:     Place;
  @Input() category:  Category;

  @Output() selectedItem = new EventEmitter<Item>();
  @Output() close = new EventEmitter();

  input: string | number;
  items: ItemsList = new ItemsList();
  textSearch: string | number = '';

  constructor(public dialog: MatDialog) {
  }

  ngOnInit() {
  }

  createNewItem() {
    const formData = { category: this.category, place: this.place,
                       name: isNaN(Number(this.textSearch)) ? this.textSearch : null,
                       barcode: !isNaN(Number(this.textSearch)) ? null : this.textSearch };
    const dialogRef = DialogService.createItemFormComponent(this.dialog, <NewItemDatas> formData);
    dialogRef.afterClosed().subscribe(i => { if (i != null) this.selectedItem.emit(i); })
  }

}

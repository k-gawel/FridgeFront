import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ItemsList} from "../../../../../../_models/response/item/ItemsList";
import {MatDialog} from "@angular/material";
import {Place} from "../../../../../../_models/response/Place";
import {Item} from "../../../../../../_models/response/item/Item";
import {ApiService} from "../../../../../../_service/api/api/api.service";

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.css']
})
export class ItemsListComponent implements OnInit {

  @Input() items: ItemsList;
  @Input() place: Place;
  @Output() selectedItem = new EventEmitter<Item>();

  constructor(public  dialog: MatDialog) {
  }

  ngOnInit() {
  }


  imageUrl(item: Item): string {
    return ApiService.imageUrl(item);
  }


}



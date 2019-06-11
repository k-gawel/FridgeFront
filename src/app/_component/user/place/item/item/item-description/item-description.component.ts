import {Component, Input, OnInit} from '@angular/core';
import {Item} from "../../../../../../_models/request/item/Item";


@Component({
  selector: 'app-item-description',
  templateUrl: './item-description.component.html',
  styleUrls: ['./item-description.component.css']
})
export class ItemDescriptionComponent implements OnInit {


  @Input() item: Item;

  constructor() { }

  ngOnInit() {
    console.debug("ItemDescriptionComponent.ngOnInit()");
  }

}

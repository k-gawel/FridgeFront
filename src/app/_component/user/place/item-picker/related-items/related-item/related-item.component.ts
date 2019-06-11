import { Component, OnInit, Input } from '@angular/core';
import {Item} from "../../../../../../_models/request/item/Item";

@Component({
  selector: 'app-related-item',
  templateUrl: './related-item.component.html',
  styleUrls: ['./related-item.component.css']
})
export class RelatedItemComponent implements OnInit {


  @Input() item: Item;

  constructor() { }

  ngOnInit() {
  }

}

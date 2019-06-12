import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ItemsList} from '../../../../../../_models/request/item/ItemsList';
import {Item} from '../../../../../../_models/request/item/Item';


@Component({
  selector: 'app-related-items-scene',
  templateUrl: './related-items-scene.component.html',
  styleUrls: ['./related-items-scene.component.css']
})
export class RelatedItemsSceneComponent implements OnInit {

  @Input() horizontal: boolean = true;

  _items: ItemsList;
  numbers: number[] = [];

  @Input() set items(items: ItemsList) {

    console.log("RelatedItemsSceneComponent.setItems() ", items);
    if(items == null)
      return;

    this._items = items;
    this.numbers = [];

    for(let i = 0; i < items.list.length; i++) {
      if(i%2 === 0) this.numbers.push(i);
    }

  }

  @Output() chosen = new EventEmitter<Item>();

  constructor() { }


  ngOnInit() {
  }


}

import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ItemsList} from '../../../../../../_models/response/item/ItemsList';
import {Item} from '../../../../../../_models/response/item/Item';
import {ImageService} from '../../../../../../_service/utils/image.service';
import {PlaceDetails} from '../../../../../../_models/response/PlaceDetails';
import {Category} from '../../../../../../_models/response/Category';
import {RelatedItemsService} from '../../../../../../_service/user/item/relatedItems/related-items.service';


@Component({
  selector: 'app-related-items-scene',
  templateUrl: './related-items-scene.component.html',
  styleUrls: ['./related-items-scene.component.css']
})
export class RelatedItemsSceneComponent {

  items: ItemsList;

  @Input() horizontal: boolean = true;

  @Input() place: PlaceDetails;

  _category: Category;
  @Input() set category(value: Category) {
    this._category = value;
    console.log("GET MOST POPULAR", this._category, this.place);
    this.relatedItemsService.getMostPopular(this._category, this.place)
      .then(l => this.items = l);
  }

  @Output() chosen = new EventEmitter<Item>();

  constructor(public itemImageService: ImageService,
              private relatedItemsService: RelatedItemsService) { }

}

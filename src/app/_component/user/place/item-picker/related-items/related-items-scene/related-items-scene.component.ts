import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ItemsList} from '../../../../../../_models/response/item/ItemsList';
import {Item} from '../../../../../../_models/response/item/Item';
import {ImageService} from '../../../../../../_service/utils/image.service';
import {RelatedItemsService} from '../../../../../../_service/user/item/relatedItems/related-items.service';


@Component({
  selector: 'app-related-items-scene',
  templateUrl: './related-items-scene.component.html',
  styleUrls: ['./related-items-scene.component.css'],
  styles: [`
    /deep/ 
    .carousel-inner, .carousel, .carousel-item {
      height: 100%;
    }
  `]
})
export class RelatedItemsSceneComponent {

  @Input() items: ItemsList;

  @Input() horizontal: boolean = true;

  @Output() chosen = new EventEmitter<Item>();

  constructor(public itemImageService: ImageService,
              private relatedItemsService: RelatedItemsService) { }

}

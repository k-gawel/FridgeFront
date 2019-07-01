import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Item} from '../../../../../_models/response/item/Item';
import {WishListItem} from '../../../../../_models/response/WishListItem';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Category} from '../../../../../_models/response/Category';
import {PlaceDetails, PlaceDetailsList} from '../../../../../_models/response/PlaceDetails';
import {WishList} from '../../../../../_models/response/WishList';
import {WishListItemService} from '../../../../../_service/user/place/wishlist/wishListItem/wish-list-item.service';
import {ItemInstance} from '../../../../../_models/response/item/ItemInstance';
import {ItemsList} from '../../../../../_models/response/item/ItemsList';
import {ItemInstancesList} from '../../../../../_models/response/item/ItemInstancesList';

@Component({
  selector: 'app-wish-list-item',
  templateUrl: './wish-list-item.component.html',
  styleUrls: ['./wish-list-item.component.css']
})
export class WishListItemComponent implements OnInit {

  constructor(private modalService: NgbModal) {
  }

  @Input() item: WishListItem;
  addedInstanceItem: Item;

  openForm() {
    const modalRef = this.modalService.open(NewInstanceForm);
    modalRef.componentInstance.wishListItem = this.item;
    modalRef.componentInstance.rootCategory = this.item.category;
    modalRef.componentInstance.place = PlaceDetailsList.ALL.getById((<WishList>this.item.wishList).placeId);
    modalRef.componentInstance.close.subscribe(s => modalRef.close());
  }

  ngOnInit() {
    if(this.item.addedInstance != null) {
      let instance = ItemInstancesList.ALL.getById(<number> this.item.addedInstance);
      this.addedInstanceItem = ItemsList.ALL.getById(instance.itemId);
    }
  }


}


@Component({
  templateUrl: './new-instance-form.html'
})
export class NewInstanceForm implements OnInit {

  constructor(private wishListItemService: WishListItemService) {
  }

  currentStage: string = 'CATEGORY';
  rootCategory: Category;
  chosenItem: Item;
  place: PlaceDetails;

  @Input() wishListItem: WishListItem;
  @Output() close = new EventEmitter<void>();

  ngOnInit() {
    this.rootCategory = <Category> this.wishListItem.category;
    this.place = PlaceDetailsList.ALL.getById((<WishList> this.wishListItem.wishList).placeId);
  }

  goToPicker() {
    this.currentStage = 'PICKER';
  }

  goToItem() {
    if(this.chosenItem == null)
      return;

    this.currentStage = 'ITEM';
  }

  addInstance(instance: ItemInstance) {
    this.wishListItemService.addInstance(this.wishListItem, instance);
    this.close.emit();
  }

}

import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import { WishList } from '../../../../../_models/request/WishList';
import { WishListItem } from '../../../../../_models/request/WishListItem';
import { WishListService } from '../../../../../_service/user/place/wishlist/wishlist/wish-list.service';
import { KeyName } from '../../../../../_models/request/KeyName';
import { WishListItemFormComponent } from '../wish-list-item-form/wish-list-item-form.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {Item} from '../../../../../_models/request/item/Item';
import {InstanceService} from '../../../../../_service/user/instance/instance.service';
import {ContainersList} from '../../../../../_models/request/Container';
import {IdSelector} from "../../../../../_service/utils/EntitySelector";
import {WishListItemService} from "../../../../../_service/user/place/wishlist/wishListItem/wish-list-item.service";
import {ItemInstancesList} from "../../../../../_models/request/item/ItemInstancesLst";
import {PlaceDetails} from "../../../../../_models/request/PlaceDetails";
import {ErrorHandlerService} from "../../../../../_service/utils/errorhanler/error-handler.service";

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.css']
})
export class WishListComponent implements OnInit {

  _wishList: WishList = null;
  _place: PlaceDetails;
  items: WishListItem[] = [];
  activeItem: WishListItem = null;

  containers: ContainersList;
  itemsInstances: ItemInstancesList = new ItemInstancesList();

  constructor(private wishListService: WishListService,
              private wishListItemService: WishListItemService,
              private modalService: NgbModal,
              private instanceService: InstanceService,
              private errorHandler: ErrorHandlerService) { }


  @Input()
  set wishList(wishList: WishList) {
    console.debug("WishListComponent.setWishList()", wishList);
    if (wishList === null)
      return;

    this._place = new PlaceDetails();
    this._place.id = wishList.placeId;
    this._wishList = wishList;

    this._wishList.wishListItems.forEach( (item: WishListItem) => {
      this.wishListItemService.get(item);
      this.items.push(item);
    })
  }


  newWishListItem(item: WishListItem) {
    console.debug("WishListComponent.newWishListItem()", item);
    this.wishListItemService.get(item)
      .then((res: WishListItem) => {
        this._wishList.pushNewItem(res);
        this.items.push(res);
      })
      .catch((e: Error) => {
        this.errorHandler.sendErrors(e);
      })
  }


  @Output() closeWishList = new EventEmitter<void>();


  ngOnInit() {
  }


  archive() {
    this.wishListService.archive(this._wishList);
  }


  selectItem(item: WishListItem) {
    if (item.equals(this.activeItem)) { return; }
    this.activeItem = item;
  }


  getInstances() {
    let idsArray: number[] = [];
    this.items.forEach( (e: WishListItem) => {
      if(e.item !== null)
        idsArray.push( e.item instanceof Item ? e.item.id : e.item )
    } );

    let placeIdSelector = new IdSelector(this._wishList.placeId);
    let itemIdsSelector = new IdSelector(idsArray);

    this.instanceService.getByItemsAndPlaces(placeIdSelector, itemIdsSelector)
      .then( (res: ItemInstancesList) => this.itemsInstances = res )
      .catch( e => this.itemsInstances = new ItemInstancesList() )
  }


  openForm() {
    let modalRef = this.modalService.open(WishListItemFormComponent, {size: 'lg'});
    modalRef.componentInstance.wishList = this._wishList;
    modalRef.componentInstance.newItem
      .subscribe((res: WishListItem) => {
        this.newWishListItem(res);
        modalRef.close();
      });
  }


}

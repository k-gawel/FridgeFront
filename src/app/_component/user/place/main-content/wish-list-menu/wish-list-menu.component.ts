import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PlaceDetails} from '../../../../../_models/response/PlaceDetails';
import {WishListQuery, WishListService} from '../../../../../_service/user/wishlist/wishlist/wish-list.service';
import {KeyName} from '../../../../../_models/response/KeyName';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {WishList, WishListList} from '../../../../../_models/response/WishList';
import {Entity} from '../../../../../_models/response/Entity';
import {CookieDataService} from '../../../../../_service/auth/cookieDatas/cookie-datas.service';
import {DialogService} from "../../../../../_service/utils/dialog.service";
import {MatDialog} from "@angular/material";
import {PlaceService} from "../../../../../_service/user/place/place/place.service";
import {OffsetLimit} from "../../../../../_util/OffsetLimit";

@Component({
  selector: 'app-wish-list-menu',
  templateUrl: './wish-list-menu.component.html',
  styleUrls: ['./wish-list-menu.component.css']
})
export class WishListMenuComponent implements OnInit {


  @Input() list: WishListList;
  @Input() place: PlaceDetails;

  @Output() selectedWishList = new EventEmitter<KeyName>();

  deleted: WishList[] = [];

  constructor(private wishListService: WishListService,
              private modalService: NgbModal,
              private placeService: PlaceService,
              private cookiesData: CookieDataService,
              private dialog: MatDialog) {
  }


  ngOnInit() {
    if(this.place == null)
      this.place = this.list.getPlace();
  }


  openForm() {
    const formDatas = {place: this.place};

    const dialogRef = DialogService.createWishListForm(this.dialog, formDatas);
  }


  select(wishList: WishList) {
    const datas = {wishList: wishList};

    const dialogRef = DialogService.createWishListComponent(this.dialog, datas);
  }


  offset: number = 0;
  loadDeleted() {
    if(this.offset == null) return;
    const limit = 10;

    let processResult = (w: WishListList) => {
      this.offset = w.size() >= limit ? this.offset + 10 : null;
      w.forEach(l => this.deleted.push(l));
    };

    let query = new WishListQuery();
    query.active = false;
    query.placeIds = [ this.place.id ];
    query.offsetLimit = new OffsetLimit(this.offset, limit);

    this.wishListService.get(query).then(processResult);
  }


}

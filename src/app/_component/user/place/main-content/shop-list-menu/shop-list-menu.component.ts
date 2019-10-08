import {Component, Input, OnInit} from '@angular/core';
import {DialogService} from "../../../../../_service/utils/dialog.service";
import {PlaceDetails} from "../../../../../_models/response/PlaceDetails";
import {ShopList, ShopListList} from "../../../../../_models/response/ShopList";
import {ShopListFormDialogData} from "../../elements/shoplist/shop-list-form/shop-list-form.component";
import {MatDialog} from "@angular/material";
import {ShopListData} from "../../elements/shoplist/shop-list/shop-list.component";
import {ShopListQuery} from "../../../../../_models/request/wishlist/ShopListQuery";
import {OffsetLimit} from "../../../../../_util/OffsetLimit";
import {ShopListService} from "../../../../../_service/user/shoplist/shop-list.service";

@Component({
  selector: 'app-shop-list-menu',
  templateUrl: './shop-list-menu.component.html',
  styleUrls: ['./shop-list-menu.component.css']
})
export class ShopListMenuComponent implements OnInit {

  @Input() list: ShopListList;
  @Input() place: PlaceDetails;

  deleted: ShopList[] = [];

  constructor(private shopListService: ShopListService,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    if(this.place == null)
      this.place = this.list.getPlace();
  }


  select(shopList: ShopList): void {
    const data: ShopListData = { shopList: shopList };

    const dialogRef = DialogService.createShopList(this.dialog, data);
  }


  openForm(): void {
    const data: ShopListFormDialogData = {place: this.place};

    const dialogRef = DialogService.createShopListForm(this.dialog, data);

    dialogRef.afterClosed().subscribe((r) => {
      if (r instanceof ShopList) this.select(r);
    })
  }

  deletedOffset = 0;
  getDeleted() {
    if(this.deletedOffset == null) return;

    let query = new ShopListQuery();
    query.offsetLimit = new OffsetLimit(this.deletedOffset, 10);
    query.status = false;
    query.places = [this.place.id];
    this.shopListService.get(query).then(r => {
      r.forEach(l => {
        this.deleted.push(l); }
        );
      this.deletedOffset = r.size() < 10 ? null : this.deletedOffset + 10;
    })
  }


}

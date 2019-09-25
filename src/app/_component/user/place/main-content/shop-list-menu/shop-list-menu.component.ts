import {Component, Input, OnInit} from '@angular/core';
import {DialogService} from "../../../../../_service/utils/dialog.service";
import {PlaceDetails} from "../../../../../_models/response/PlaceDetails";
import {ShopList, ShopListList} from "../../../../../_models/response/ShopList";
import {ShopListFormDialogData} from "../../elements/shoplist/shop-list-form/shop-list-form.component";
import {MatDialog} from "@angular/material";

@Component({
  selector: 'app-shop-list-menu',
  templateUrl: './shop-list-menu.component.html',
  styleUrls: ['./shop-list-menu.component.css']
})
export class ShopListMenuComponent implements OnInit {

  @Input() list: ShopListList;

  place: PlaceDetails;

  constructor(private dialog: MatDialog) {
  }

  ngOnInit() {
    this.place = this.list.getPlace();
  }


  select(shopList: ShopList): void {

  }


  openForm(): void {
    const data: ShopListFormDialogData = {place: this.place};

    const dialogRef = DialogService.createShopListForm(this.dialog, data);

    dialogRef.afterClosed().subscribe((r) => {
      if (r instanceof ShopList) this.select(r);
    })
  }


}

import {Component, Inject, OnInit} from '@angular/core';
import {ShopList} from "../../../../../../_models/response/ShopList";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material";
import {DialogService} from "../../../../../../_service/utils/dialog.service";

export class ShopListData {
  shopList: ShopList
}

@Component({
  selector: 'app-shop-list',
  templateUrl: './shop-list.component.html',
  styleUrls: ['./shop-list.component.css']
})
export class ShopListComponent implements OnInit {

  private shopList: ShopList;

  constructor(public matDialog: MatDialog,
              public dialogRef: MatDialogRef<ShopListComponent>,
              @Inject(MAT_DIALOG_DATA) public data: ShopListData) {
    this.shopList = data.shopList;
  }

  ngOnInit() {
  }

  openForm() {
    const dialogRef = DialogService.createShopListInstanceForm(this.matDialog, {shopList: this.shopList});
  }

}

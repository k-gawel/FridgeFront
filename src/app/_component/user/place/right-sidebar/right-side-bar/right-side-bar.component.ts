import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {PlaceDetails} from '../../../../../_models/response/PlaceDetails';
import {ContainersList} from '../../../../../_models/response/Container';
import {KeyName} from '../../../../../_models/response/KeyName';
import {Size, WindowService} from '../../../../../_service/utils/window.service';
import {Category} from '../../../../../_models/response/Category';
import * as $ from 'jquery'

@Component({
  selector: 'app-right-side-bar',
  templateUrl: './right-side-bar.component.html',
  styleUrls: ['./right-side-bar.component.css']
})
export class RightSideBarComponent implements OnInit, OnDestroy {

  _place: PlaceDetails;
  size: Size;

  content: string[];

  constructor(private windowService: WindowService) {
  }

  ngOnInit() {

    this.windowService.$resize.subscribe(s => {
      let that = this;
      if(s <= 1) {
        this.content = [];
      } else if(s == 2) {
        this.content = ['USERS', 'CONTAINERS', 'WISHLISTS', 'CATEGORIES'];
        console.log("INCLUDES USERS", this.content.includes("USERS"));
        console.log("INCLUDES CONTAINERS", this.content.includes("CONTAINERS"));
      } else {
        this.content = ['USERS', 'CONTAINERS', 'WISHLISTS'];
      }

      this.size = s;
    })
  }

  ngOnDestroy() {
    this.windowService.$resize.unsubscribe();
  }

  @Input() set place(value: PlaceDetails) {
    console.debug("RightSideBarComponent.setPlace()", value);
    this._place = value;
  }

  @Output() chosenContainers = new EventEmitter<ContainersList>();

  @Output() selectedWishList = new EventEmitter<KeyName>();

  @Output() chosenCategory   = new EventEmitter<Category>();


}



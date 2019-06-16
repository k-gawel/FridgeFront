import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PlaceDetails} from '../../../../../_models/request/PlaceDetails';
import {ContainersList} from '../../../../../_models/request/Container';
import {KeyName} from '../../../../../_models/request/KeyName';

@Component({
  selector: 'app-right-side-bar',
  templateUrl: './right-side-bar.component.html',
  styleUrls: ['./right-side-bar.component.css']
})
export class RightSideBarComponent implements OnInit {

  _place: PlaceDetails;

  @Input() set place(value: PlaceDetails) {
    console.debug("RightSideBarComponent.setPlace()", value);
    this._place = value;
  }

  @Output() chosenContainers = new EventEmitter<ContainersList>();
  @Output() selectedWishList = new EventEmitter<KeyName>();

  constructor() { }

  ngOnInit() {
  }

}

import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {KeyName, KeyNameList} from "../../../../_models/request/KeyName";
import {PlaceForm} from "../../../../_models/response/PlaceForm";
import {ErrorHandlerService} from "../../../../_service/utils/errorhanler/error-handler.service";
import {PlaceService} from "../../../../_service/user/place/place/place.service";
import {PlaceDetails} from "../../../../_models/request/PlaceDetails";
import {ErrorMessage} from "../../../../_models/util/ErrorMessage";

@Component({
  selector: 'app-place-menu',
  templateUrl: './place-menu.component.html',
  styleUrls: ['./place-menu.component.css']
})
export class PlaceMenuComponent implements OnInit {

  @Input()
  set places(value: KeyNameList) {
    this._places = value;
  }

  @Output() chosenPlace = new EventEmitter<KeyName>();

  _places: KeyNameList;
  form: PlaceForm = new PlaceForm();

  constructor(private errorHandler: ErrorHandlerService,
              private placeService: PlaceService) { }

  ngOnInit() {
  }

  addNewPlace() {

    if(!this.form.validate()) {
      this.errorHandler.sendErrors(this.form.errors);
      return;
    }

    this.placeService.newPlace(this.form)
      .then((res: KeyName) => {
        this._places.push(res);
        this.clickOnPlace(res);
      })
      .catch((e: ErrorMessage) => {
        this.errorHandler.sendErrors(e);
      })


  }

  @Input() set removedPlace(place: PlaceDetails) {
    if(place != null)
      this._places.remove(place);
  }

  clickOnPlace(place: KeyName) {
      this.chosenPlace.emit(place);
  }

}

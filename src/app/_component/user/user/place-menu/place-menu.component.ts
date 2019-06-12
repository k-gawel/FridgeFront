import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {KeyName, KeyNameList} from '../../../../_models/request/KeyName';
import {PlaceForm} from '../../../../_models/response/PlaceForm';
import {ErrorHandlerService} from '../../../../_service/utils/errorhanler/error-handler.service';
import {PlaceService} from '../../../../_service/user/place/place/place.service';
import {PlaceDetails} from '../../../../_models/request/PlaceDetails';
import {ErrorStateMatcher} from '@angular/material';
import {FormControl, FormGroupDirective, NgForm} from '@angular/forms';

@Component({
  selector: 'app-place-menu',
  templateUrl: './place-menu.component.html',
  styleUrls: ['./place-menu.component.css']
})
export class PlaceMenuComponent implements OnInit {

  @Output() chosenPlace = new EventEmitter<KeyName>();
  @Input()  places: KeyNameList;

  form: PlaceForm = new PlaceForm();
  errorMatcher: PlaceFormErrorStateMatcher;

  constructor(private errorHandler: ErrorHandlerService,
              private placeService: PlaceService) {
    this.errorMatcher = new PlaceFormErrorStateMatcher(this.form);
  }

  ngOnInit() {
  }



  addNewPlace() {
    if(!this.form.validate())
      this.errorHandler.sendErrors(this.form.errors);
    else {
      this.placeService.newPlace(this.form)
        .then(p => {
          this.places.push(p);
          this.setPlace(p);
        })
        .catch(e => this.form.errors = e);
    }
  }


  @Input() set removedPlace(place: PlaceDetails) {
    if(place != null)
      this.places.remove(place)
  }


  setPlace(place: KeyName) {
      this.chosenPlace.emit(place);
  }


}


export class PlaceFormErrorStateMatcher implements ErrorStateMatcher {

  constructor(private form: PlaceForm) {
  }

  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return this.form.errors != null;
  }

}

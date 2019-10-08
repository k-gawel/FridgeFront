import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {ProducersList} from "../../../../../_models/response/item/Producer";
import {Category} from "../../../../../_models/response/Category";
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef, MatListOption} from "@angular/material";

@Component({
  selector: 'app-producers-menu',
  templateUrl: './producers-menu.component.html',
  styleUrls: ['./producers-menu.component.css']
})
export class ProducersMenuComponent implements OnInit {

  console = console;

  @Input() producers: ProducersList;
  @Input() selectedProducers: ProducersList;
  @Output() chosenProducers = new EventEmitter<ProducersList>();

  constructor() {
  }

  ngOnInit() {
  }


  onSelectionChange(values: MatListOption[]) {
    this.selectedProducers = new ProducersList();
    values.map(o => o.value).forEach(o => this.selectedProducers.add(o));
    this.chosenProducers.emit(this.selectedProducers);
  }

}

@Component({
  template: `
    <app-producers-menu [producers]="data.producers" [selectedProducers]="data.selectedProducers"
                        (chosenProducers)="setProducers($event)">
      
    </app-producers-menu>
    <button mat-button (click)="ok()" color="primary">OK</button>
  `
})
export class ProducersMenuSheet {

  producers: ProducersList;
  public chosenProducers: ProducersList;

  constructor(private sheetRef: MatBottomSheetRef<ProducersMenuSheet>,
              @Inject(MAT_BOTTOM_SHEET_DATA) public data: { producers: ProducersList, selectedProducers: ProducersList }) {
    this.producers = this.data.producers;
    this.chosenProducers = this.data.selectedProducers;
  }

  setProducers(producers: ProducersList) {
    this.chosenProducers = producers;
  }

  ok() {
    this.sheetRef.dismiss(this.chosenProducers);
  }

}

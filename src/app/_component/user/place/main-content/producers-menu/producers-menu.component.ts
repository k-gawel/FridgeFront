import {Component, OnInit} from '@angular/core';
import {ProducersList} from "../../../../../_models/response/item/Producer";

@Component({
  selector: 'app-producers-menu',
  templateUrl: './producers-menu.component.html',
  styleUrls: ['./producers-menu.component.css']
})
export class ProducersMenuComponent implements OnInit {

  producers: ProducersList = ProducersList.ALL;

  constructor() {
  }

  ngOnInit() {
  }

}

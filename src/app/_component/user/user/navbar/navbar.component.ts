import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AccountDatas} from '../../../../_models/response/AccountDatas';
import {KeyName} from '../../../../_models/response/KeyName';
import {Size, WindowService} from "../../../../_service/utils/window.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Input() accountDatas: AccountDatas;

  @Output() chosenPlace = new EventEmitter<KeyName>();

  size: Size;

  constructor(private windowService: WindowService) {}

  ngOnInit() {
    this.windowService.$resize.subscribe(s => {
      this.size = s;
    })
  }

  collapse() {
    document.getElementById("mySidenav").style.width = "0";
  }

  expand() {
    document.getElementById("mySidenav").style.width = "100%"
  }

}

import {Component, OnInit} from '@angular/core';
import {AuthService} from './_service/auth/auth/auth.service';
import {RoleContent} from './_models/util/Content';
import {AccountDatas} from './_models/request/AccountDatas';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  content: RoleContent = RoleContent.GUEST;
  contentParams: any;

  text: string;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.authService.$roleContent.subscribe((content: RoleContent) => this.content = content);

    this.authService.login()
      .then((response: AccountDatas) => {
        if(response != null) {
         this.setAccount(response);
        }
      });
  }

  setAccount(account: AccountDatas) {
    this.contentParams = account;
    this.content = RoleContent.USER;
  }

}

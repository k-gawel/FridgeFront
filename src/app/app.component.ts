import {Component, OnInit} from '@angular/core';
import {AuthService} from './_service/auth/auth/auth.service';
import {RoleContent} from './_models/util/Content';
import {AccountDatas} from './_models/response/AccountDatas';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  content: RoleContent;
  contentParams: any;

  text: string;


  constructor(private authService: AuthService) {
  }

  hundred: number[] = [];

  ngOnInit() {
    for(let i = 0; i < 100; i = i + 5) {
      this.hundred.push(i);
    }

    this.authService.$roleContent.subscribe((content: RoleContent) => this.content = content);

    this.authService.login()
      .then((response: AccountDatas) => {
        if(response != null)
          this.setAccount(response);
        else
          this.authService.$roleContent.next(RoleContent.GUEST);
      })
  }


  setAccount(account: AccountDatas) {
    this.contentParams = account;
    this.content = RoleContent.USER;
  }


}

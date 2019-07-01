import {Component, OnInit} from '@angular/core';
import {AccountForm} from '../../../../_models/request/AccountForm';
import {AccountService} from '../../../../_service/user/user/account.service';

@Component({
  selector: 'app-account-managment',
  templateUrl: './account-managment.component.html',
  styleUrls: ['./account-managment.component.css']
})
export class AccountManagmentComponent implements OnInit {

  constructor(private accountService: AccountService) { }

  form: AccountForm = new AccountForm();

  ngOnInit() {
  }

}

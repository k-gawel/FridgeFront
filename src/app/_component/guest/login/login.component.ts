import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {LoginForm} from '../../../_models/request/login/LoginForm';
import {AuthService} from '../../../_service/auth/auth/auth.service';
import {RoleContent} from '../../../_models/util/Content';
import {AccountDatas} from '../../../_models/response/AccountDatas';
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Output() account = new EventEmitter<AccountDatas>();

  form = new LoginForm();

  constructor(private authService: AuthService) { }


  submit() {
    let processSubmit = (res: AccountDatas) => {
      if(res != null)
        this.account.emit(res);
    };

    let processValidation = (res: boolean) => {
      if(res)
        this.authService.login(this.form).then(processSubmit);
    };

    this.form.validate().then(processValidation);
  }

  switchToRegister() {
    this.authService.$roleContent.next(RoleContent.GUEST_REGISTER);
  }

  ngOnInit() {
    this.form.name = "SAMPLEUSER";
    this.form.password = "password";
  }

}

import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {LoginForm} from '../../../_models/response/LoginForm';
import {AuthService} from '../../../_service/auth/auth/auth.service';
import {RoleContent} from '../../../_models/util/Content';
import {AccountDatas} from '../../../_models/request/AccountDatas';
import {ErrorMessage} from '../../../_models/util/ErrorMessage';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Output() account = new EventEmitter<AccountDatas>();

  loginForm = new LoginForm();

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }


  submit() {
    if(this.loginForm.validate())
      this.authService.login(this.loginForm)
        .then((result: AccountDatas) => {
          if(result != null)
            this.account.emit(result);
          else
            throw new ErrorMessage("loginaccount.nullable");
        })
        .catch((e: ErrorMessage) => {
          this.loginForm.errors = e;
        });
  }


  switchToRegister() {
    this.authService.$roleContent.next(RoleContent.GUEST_REGISTER);
  }

}

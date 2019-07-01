import {Component, EventEmitter, Output} from '@angular/core';
import {LoginForm} from '../../../_models/request/LoginForm';
import {AuthService} from '../../../_service/auth/auth/auth.service';
import {RoleContent} from '../../../_models/util/Content';
import {AccountDatas} from '../../../_models/response/AccountDatas';
import {ErrorMessage} from '../../../_models/util/ErrorMessage';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {

  @Output() account = new EventEmitter<AccountDatas>();

  loginForm = new LoginForm();

  constructor(private authService: AuthService) { }


  submit() {
    if(!this.loginForm.validate())
      return;

    this.authService.login(this.loginForm)
      .then((result: AccountDatas) => {
        if(result != null)
          this.account.emit(result);
        else
          throw new ErrorMessage("loginaccount.nullable");
      })
      .catch((e: Error) => this.loginForm.errors = new ErrorMessage(e.message) );
  }

  switchToRegister() {
    this.authService.$roleContent.next(RoleContent.GUEST_REGISTER);
  }

}

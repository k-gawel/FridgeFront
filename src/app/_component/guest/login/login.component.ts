import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {LoginForm} from '../../../_models/request/LoginForm';
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
    if(!this.form.validate()) {
      console.log("ERROR", this.form);
      return;
    }

    this.authService.login(this.form)
      .then((result: AccountDatas) => this.account.emit(result) )
      .catch((e: HttpErrorResponse) => {
        let msg = e.error.localizedMessage;
        let target = msg.split(".")[0];
        let type = msg.split(".")[1];
        if(target == "password")
          this.form.passwordError = type;
        else
          this.form.nameError = type;
      });
  }

  switchToRegister() {
    this.authService.$roleContent.next(RoleContent.GUEST_REGISTER);
  }

  ngOnInit() {
    this.form.name = "SAMPLEUSER";
    this.form.password = "password";
  }

}

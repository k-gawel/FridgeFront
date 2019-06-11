import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../_service/auth/auth/auth.service';
import {RoleContent} from '../../../_models/util/Content';
import {AccountForm} from "../../../_models/response/AccountForm";
import {ErrorMessage} from "../../../_models/util/ErrorMessage";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: AccountForm = new AccountForm();

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  submit() {

    this.authService.register(this.form)
      .then((response: Boolean) => {
        this.switchToLogin();
      })
      .catch((error: ErrorMessage) => {
        console.log(error.messages);
      });

  }

  switchToLogin() {
    this.authService.$roleContent.next(RoleContent.GUEST);
  }

}

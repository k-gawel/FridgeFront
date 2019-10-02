import {Component} from '@angular/core';
import {AuthService} from '../../../_service/auth/auth/auth.service';
import {RoleContent} from '../../../_models/util/Content';
import {AccountForm} from '../../../_models/request/account/AccountForm';
import {ErrorMessage} from '../../../_models/util/ErrorMessage';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  form: AccountForm = new AccountForm();

  constructor(private authService: AuthService) { }

  submit() {
    if(!this.form.validate())
      return;

    this.authService.register(this.form)
      .then(() => window.location.reload() )
      .catch((error: ErrorMessage) => console.log(error.messages) );
  }

  switchToLogin() {
    this.authService.$roleContent.next(RoleContent.GUEST);
  }

}

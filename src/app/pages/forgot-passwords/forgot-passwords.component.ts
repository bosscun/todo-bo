import { Component, OnInit } from '@angular/core';
import { AccountApi } from '../../api/services/custom';
import { error, success } from '../../helpers/notification';

@Component({
  selector: 'app-forgot-passwords',
  templateUrl: './forgot-passwords.component.html',
  styleUrls: ['./forgot-passwords.component.css']
})
export class ForgotPasswordsComponent implements OnInit {
  email = '';

  constructor(private accountApi: AccountApi) {
  }


  ngOnInit() {
  }

  forgotPassword() {
    console.log('email is', this.email);
    this.accountApi.resetPassword({ email: this.email })
      .subscribe(() => {
        success('Send reset password to email succes');
      }, e => error(e.message));
  }
}

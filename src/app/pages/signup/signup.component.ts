import { Component, OnInit } from '@angular/core';
import { AccountApi } from '../../api/services/custom';
import { Account } from '../../api/models';
import { Router } from '@angular/router';
import { error, info, success } from '../../helpers/notification';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  account = new Account();
  passwordConfirm = '';

  constructor(private accountApi: AccountApi,
              private router: Router) {
    if (accountApi.getCurrentId()) {
      this.router.navigate(['/main']);
    }
  }

  ngOnInit() {
  }

  signUp() {
    info('Signing up, please wait...!!');
    if (this.passwordConfirm !== this.account.password) {
      error('Passwords not matched !');
      return;
    }
    this.accountApi
      .create(this.account)
      .subscribe(account => {
        success('Sign up succes');
        this.router.navigate(['/main']);
      }, e => {
        error(e.message);
      });
  }
}

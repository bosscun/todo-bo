import { Component, OnInit } from '@angular/core';
import { AccountApi } from '../../api/services/custom';
import { error, success } from '../../helpers/notification';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs-compat/add/observable/of';
import 'rxjs-compat/add/operator/delay';

@Component({
  selector: 'app-reset-passwords',
  templateUrl: './reset-passwords.component.html',
  styleUrls: ['./reset-passwords.component.css']
})
export class ResetPasswordsComponent implements OnInit {
  accessToken = '';
  newPassword = '';
  confirmationPassword = '';

  constructor(private accountApi: AccountApi,
              private router: Router) {
    this.accessToken = location.href.split('access_token=')[1];
  }

  ngOnInit() {
  }

  resetPassword() {
    if (this.newPassword !== this.confirmationPassword) {
      error('Veuillez vérifier le mot de passe');
      return;
    }

    this.accountApi
      .setPassword(this.newPassword, (headers: HttpHeaders) => {
        return headers.append('X-Access-Token', this.accessToken);
      })
      .subscribe(() => {
        success('Mot de passe réinitialisé');
        Observable.of(true).delay(1000).subscribe(() => this.router.navigate(['/login']));
      }, e => error(e.message));
  }

}

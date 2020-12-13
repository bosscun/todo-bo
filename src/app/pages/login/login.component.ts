import { Component, OnInit } from '@angular/core';
import { AccountApi } from '../../api/services/custom';
import { Router } from '@angular/router';
import { LoopBackAuth } from '../../api/services/core';
import { DefaultService } from '../../apiNestJs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  account = { email: 'Adelia.Gleason@gmail.com', password: 'secret' };
  rememberMe = true;
  formValidation: any;

  constructor(private accountApi: AccountApi,
              private auth: LoopBackAuth,
              private httpClient: HttpClient,
              private defaultService: DefaultService,
              private router: Router) {
    if (accountApi.getCurrentId()) {
      this.router.navigate(['/main']);
    }
  }

  ngOnInit(): void {
    const $ = (window as any).$;
    $.getScript('assets/js/main.min.js', () => {
      const App = (window as any).App;
      App.init();
    });
    this.formValidation = $('#loginForm').parsley();
  }

  login() {

    if (!this.formValidation.isValid()) {
      return;
    }
    this.httpClient.post('http://localhost:3200/auth/login', this.account)
      .subscribe((data: any) => {
        console.log(data);
        localStorage.setItem('acessToken', data);
      });
    // this.accountApi
    //   .login(this.account, 'user', this.rememberMe)
    //   .subscribe((accessToken: AccountAccessToken) => {
    //
    //     this.accountApi
    //       .getRoles(accessToken.userId)
    //       .subscribe((roles: any[]) => {
    //         success('Login success');
    //         this.auth.setUser(Object.assign({}, this.auth.getCurrentUserData(), { roles: 'admin' }));
    //         this.router.navigate(['/main']);
    //       }, error1 => {
    //         error('Only admin can access');
    //         this.accountApi.logout()
    //           .subscribe(() => {
    //           }, () => {
    //           });
    //       });
    //
    //   }, error1 => {
    //     error(error1.message);
    //   });
  }
}

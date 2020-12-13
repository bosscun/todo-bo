import { Component, OnInit } from '@angular/core';
import { AccountApi } from '../../../api/services/custom';
import { Account } from '../../../api/models';
import { error, success } from '../../../helpers/notification';
import { Router } from '@angular/router';

declare const $;

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  accounts: Account[] = [];
  passwordConfirm = '';
  currentAccount = new Account();

  changePass = false;

  assign = Object.assign;
  userLoading = false;

  formValidation: any;

  constructor(private accountApi: AccountApi,
              private  router: Router) {
    this.findAccounts();
  }

  ngOnInit() {

    $.getScript('assets/js/main.min.js', () => {
      const App = (window as any).App;
      App.init();
    });
    this.formValidation = $('#add_user').parsley();
  }


  findAccounts() {
    this.userLoading = true;
    this.accountApi.find()
      .subscribe((accounts: Account[]) => {
        this.userLoading = false;
        this.accounts = accounts;
      }, error1 => {
        this.userLoading = false;
        error(error1.message);
      });
  }

  addNewUser(user: Account) {

    this.formValidation.whenValidate()
      .then(event => {
        $('#form-add').modal('hide');
        this.accountApi
          .create(user)
          .subscribe(() => {
            success('Add new user success');
            this.router.navigate(['/main/user']);
            this.findAccounts();
          }, e => {
            error(e.message);
          });
      });

  }

  deleteUser(user: Account) {
    this.accountApi.deleteById(user.id)
      .subscribe(() => {
        success('Delete todo success');
        this.findAccounts();
      }, error);

  }

  updateUser(user: Account) {
    this.accountApi.patchAttributes(user.id, user)
      .subscribe(() => {
        success('User info updated successfully');
        this.findAccounts();
      }, e => error(e.message));
  }
}

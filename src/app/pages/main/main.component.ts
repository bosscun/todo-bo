import { Component, OnInit } from '@angular/core';
import { AccountApi } from '../../api/services/custom';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  constructor(private accountApi: AccountApi,
              private router: Router) {

  }

  ngOnInit(): void {
    const $ = (window as any).$;
    $.getScript('assets/js/main.min.js', () => {
      const App = (window as any).App;
      App.init();
    });
  }

  logOut() {
    this.accountApi
      .logout()
      .subscribe(value => {
        this.router.navigate(['/login']);
      }, error1 => {
        this.router.navigate(['/login']);
      });
  }

}

import { Component, OnInit } from '@angular/core';
import { LoopBackConfig } from './api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor() {
    // LoopBackConfig.setBaseURL('http://localhost:3000');
    LoopBackConfig.setBaseURL('https://api.todo.ql6625.fr');
    LoopBackConfig.setApiVersion('api');

    const $ = (window as any).$;
    $.extend($.gritter.options, { time: 1000, position: 'bottom-right' });
  }

  ngOnInit(): void {
    const $ = (window as any).$;
    $.getScript('assets/js/main.min.js', () => {
      const App = (window as any).App;
      App.init();
    });
  }

}

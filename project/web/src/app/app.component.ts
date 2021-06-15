import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  tab = 'diplom';

  constructor(
    private router: Router,
  ) {

  }

  changeTab($event) {
    this.tab = $event.target.getAttribute('rel');
    this.router.navigate([this.tab]);
  }
}

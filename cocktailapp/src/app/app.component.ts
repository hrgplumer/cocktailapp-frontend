import { Component } from '@angular/core';
import { AppAssets } from './app.assets';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cocktailapp';
  key = 9973533 + ''; // not great, but its fine for a demo app

  constructor() {
    AppAssets.API_KEY = this.key;
    Object.freeze(AppAssets);
  }
}


import { Component } from '@angular/core';
import { AppAssets } from './app.assets';
import { Ingredient } from './ingredient.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cocktailapp';
  key = 9973533 + ''; // not great, but its fine for a demo app

  ingredientsList: Array<Ingredient>;

  constructor() {
    AppAssets.API_KEY = this.key;
    Object.freeze(AppAssets);

    this.ingredientsList = new Array<Ingredient>();
  }
}


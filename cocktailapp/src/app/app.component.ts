import { Component, OnInit } from '@angular/core';
import { AppAssets } from './app.assets';
import { IngredientService } from './ingredient.service';
import { CocktailDbService } from './cocktaildb.service';
import { Ingredient } from './ingredient.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'cocktailapp';

  ingredients: string = '';

  constructor(private ingService: IngredientService, private api: CocktailDbService) {
    ingService.currentIngredients.subscribe(res => {
      this.ingredients = res;
      console.log(this.ingredients);
    })
  }

  ngOnInit() {
    Object.freeze(AppAssets);
  }
}


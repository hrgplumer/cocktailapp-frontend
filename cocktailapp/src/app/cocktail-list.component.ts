import { Component, Input } from '@angular/core';
import { IngredientService } from './ingredient.service';
import { CocktailDbService } from './cocktaildb.service';

@Component({
    selector: 'cocktail-list',
    templateUrl: './cocktail-list.component.html',
    styleUrls: ['./cocktail-list.component.css']
})
export class CocktailListComponent {
    title = 'cocktailapp';

    ingredients: string = '';

    constructor(private api: CocktailDbService, private ingService: IngredientService) {
        this.ingService.currentIngredients.subscribe(res => {
            this.ingredients = res;
        });
    }
}
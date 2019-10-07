import { Component } from '@angular/core';
import { IngredientService } from './ingredient.service';
import { CocktailDbService } from './cocktaildb.service';
import { Cocktail } from './cocktail.interface';
import { concatMap } from 'rxjs/operators';

@Component({
    selector: 'cocktail-list',
    templateUrl: './cocktail-list.component.html',
    styleUrls: ['./cocktail-list.component.css']
})
export class CocktailListComponent {
    title = 'cocktailapp';

    cocktails: Array<Cocktail>;

    constructor(private api: CocktailDbService, private ingService: IngredientService) {
        this.cocktails = new Array<Cocktail>();

        // Flatten nested observable
        const pipe = this.ingService.currentIngredients.pipe(
            concatMap(res => this.api.getCocktailsByIngredientsList(res))
        );

        // Map the array to a list of cocktails
        pipe.subscribe((drinks: any) => {
            let theDrinks = drinks.drinks;
            // Use new array for new ingredients
            this.cocktails.splice(0, this.cocktails.length);
            
            if (Array.isArray(theDrinks)) {
                theDrinks.forEach(drink => {
                    this.cocktails.push(<Cocktail>{
                        id: drink.idDrink,
                        name: drink.strDrink,
                        thumbnail: drink.strDrinkThumb
                    });
                });
            }
        });
    }
}
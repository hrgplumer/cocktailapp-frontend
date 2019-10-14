import { Component, OnInit } from '@angular/core';
import { IngredientService } from './ingredient.service';
import { CocktailDbService } from './cocktaildb.service';
import { Cocktail } from './cocktail.interface';
import { concatMap } from 'rxjs/operators';

@Component({
    selector: 'cocktail-list',
    templateUrl: './cocktail-list.component.html',
    styleUrls: ['./cocktail-list.component.css']
})
export class CocktailListComponent implements OnInit {
    cocktails: Array<Cocktail> = new Array<Cocktail>();

    constructor(private api: CocktailDbService, private ingService: IngredientService) {

    }

    ngOnInit() {
        this.observeIngredientChanges();

        // On back events the following code will check if ingredients exist and repopulate the cocktails list.
        let ings = this.ingService.getIngredients();
        if (ings) {
            this.api.getCocktailsByIngredientsList(ings).subscribe(this.processCocktails.bind(this));
        }
    }

    observeIngredientChanges() {
        // Flatten nested observable
        const pipe = this.ingService.currentIngredients.pipe(
            concatMap(res => this.api.getCocktailsByIngredientsList(res))
        );

        // Map the array to a list of cocktails
        pipe.subscribe(this.processCocktails.bind(this));
    }

    processCocktails(drinks: any) {
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
    }
}
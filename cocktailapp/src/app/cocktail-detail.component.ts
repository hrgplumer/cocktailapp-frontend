import { Component, OnInit } from '@angular/core';
import { Cocktail } from './cocktail.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { CocktailDbService } from './cocktaildb.service';

@Component({
    selector: 'cocktail-detail',
    templateUrl: './cocktail-detail.component.html',
    styleUrls: ['./cocktail-detail.component.css']
})
export class CocktailDetailComponent implements OnInit {
    cocktail: Cocktail;

    constructor(private api: CocktailDbService, private route: ActivatedRoute, private router: Router) { }

    ngOnInit() {
        let cocktailId = this.route.snapshot.paramMap.get('cocktailId');
        if (!cocktailId) {
            this.router.navigate(['']);
        }

        this.api.getCocktailById(cocktailId).subscribe((data: any) => {
            this.cocktail = this.mapCocktail(data.drinks[0]);
        });

    }

    mapCocktail(data): Cocktail {
        const cocktail = <Cocktail>{};
        cocktail.id = data.idDrink;
        cocktail.name = data.strDrink;
        cocktail.thumbnail = data.strDrinkThumb;
        cocktail.glass = data.strGlass;
        cocktail.instructions = data.strInstructions;
        cocktail.ingredients = [];
        /**
         * Data blob contains fields strIngredient1 - strIngredient15, and strMeasure1 - strMeasure15.
         * So, loop through properties instead of assigning each one manually
         */
        const strIngredient = 'strIngredient';
        const strMeasure = 'strMeasure';
        for (let i = 1; i <= 15; i++) {
            let ingProp = strIngredient + i;
            let measureProp = strMeasure + i;

            if (data.hasOwnProperty(ingProp) && data.hasOwnProperty(measureProp)) {
                if (data[ingProp]) {
                    cocktail.ingredients.push({
                        ingredient: data[ingProp],
                        measure: data[measureProp]
                    });
                }
            }
        }
        
        return cocktail;
    }


}
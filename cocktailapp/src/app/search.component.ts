import { Component, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { CocktailDbService } from './cocktaildb.service';
import { Ingredient } from './ingredient.interface';

@Component({
    selector: 'search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

    myControl = new FormControl();
    options: any = null;
    filteredOptions: Observable<string[]>;

    ingredientSelection: string;

    ingredientsList: Array<Ingredient>;

    constructor(private api: CocktailDbService) {
        this.ingredientsList = new Array<Ingredient>();
    }

    ngOnInit() {
        // Populate the autocomplete with the ingredients list from the api
        this.api.getIngredients().subscribe((ing: any) => {
            // The api returns a list in the form { drinks: [{strIngredient1: "Rum"}, {strIngredient1: "Brandy"}]} etc...            
            this.options = ing.drinks.map(drink => drink.strIngredient1);
            this.filteredOptions = this.myControl.valueChanges.pipe(
                startWith(''),
                map(value => this._filter(value))
            );
        });
    }

    onOptionSelected() {
        this.addIngredient(this.ingredientSelection);
    }

    addIngredient(ingredient: string) {
        console.log(`adding ingredient ${ingredient}`);
        this.api.getIngredientByName(ingredient).subscribe((ing: any) => {
            let theIngredient = ing.ingredients[0];

            this.ingredientsList.push(this.createIngredient(
                theIngredient.idIngredient,
                theIngredient.strIngredient,
                theIngredient.strDescription,
                theIngredient.strType,
                theIngredient.strABV));
        });

    }

    /**
     * This is called by the child IngredientComponent when an ingredient is removed from the UI.
     * @param ingredient The ingredient to delete.
     */
    onIngredientDeleted(ingredient: string) {
        console.log(`deleted ingredient ${ingredient}`);
        // Remove ingredient
        this.ingredientsList = this.ingredientsList.filter(element => {
            return element.name !== ingredient;
        });
    }

    /* Utility method required for autocomplete control */
    private _filter(value: string): string[] {
        const filterValue = value.toLowerCase();

        return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
    }

    private createIngredient(id: string, name: string, description: string, type: string, abv: string): Ingredient {
        return {
            id: id,
            name: name,
            description: description,
            type: type,
            abv: abv
        };
    }

}

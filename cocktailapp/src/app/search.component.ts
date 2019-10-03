import { Component, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { CocktailDbService } from './cocktaildb.service';

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

    ingredientsList: Array<string>;

    constructor(private api: CocktailDbService) {
        this.ingredientsList = new Array<string>();
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
        this.ingredientsList.push(ingredient);
    }

    add(a, b) {
        return a + b;
    }

    /**
     * This is called by the child IngredientComponent when an ingredient is removed from the UI.
     * @param ingredient The ingredient to delete.
     */
    onIngredientDeleted(ingredient:string) {
        console.log(`deleted ingredient ${ingredient}`);
        // Remove ingredient
        this.ingredientsList = this.ingredientsList.filter(element => {
            return element !== ingredient;
        });
    }

    /* Utility method required for autocomplete control */
    private _filter(value: string): string[] {
        const filterValue = value.toLowerCase();

        return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
    }
}
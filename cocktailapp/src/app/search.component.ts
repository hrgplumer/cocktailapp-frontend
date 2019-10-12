import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { CocktailDbService } from './cocktaildb.service';
import { Ingredient } from './ingredient.interface';
import { IngredientService } from './ingredient.service';

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

    constructor(private api: CocktailDbService, private ingService: IngredientService) {
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

    /**
     * Fired when user selects an option from the dropdown
     */
    onOptionSelected() {
        this.getIngredient(this.ingredientSelection, this.addToIngredientsList.bind(this));
    }

    /**
     * Gets ingredient data from the API and returns the new Ingredient.
     * @param ingredient The name of the ingredient added
     */
    getIngredient(ingredient: string, callback) {
        this.api.getIngredientByName(ingredient).subscribe(
            (ing: any) => {
                let theIngredient = ing.ingredients[0];
                let newIngredient = this.mapIngredient(theIngredient);
                callback(newIngredient);
            },
            (err) => {
                console.error(`Could not get ${ingredient} from the server: ${err}`);
            });

        return null;
    }

    /**
     * Adds this Ingredient to the ingredients list.
     * @param ing The ingredient to add
     */
    addToIngredientsList(ing: Ingredient) {
        this.ingService.addIngredient(ing);
    }

    /**
     * This is called by the child IngredientComponent when an ingredient is removed from the UI.
     * @param ingredient The ingredient to delete.
     */
    onIngredientDeleted(ingredient: string) {
        this.ingService.removeIngredient(ingredient);
    }

    private formatAbv(abv: string): string {
        return abv? abv + '%': '';
    }

    private mapIngredient(data: any): Ingredient {
        return <Ingredient>{
            id: data.idIngredient,
            name: data.strIngredient,
            description: data.strDescription,
            type: data.strType,
            abv: this.formatAbv(data.strABV)
        };
    }

    /* Utility method required for autocomplete control */
    private _filter(value: string): string[] {
        const filterValue = value.toLowerCase();

        return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
    }
}

import { Component, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
    selector: 'search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css'] //, 'node_modules/primeflex/primeflex.css'
})
export class SearchComponent implements OnInit {

    myControl = new FormControl();
    options: string[] = ['Gin', 'Vodka', 'Tequila'];
    filteredOptions: Observable<string[]>;

    ingredientSelection: string;

    ingredientsList: Array<string>;

    constructor() {
        this.ingredientsList = new Array<string>();
    }

    ngOnInit() {
        this.filteredOptions = this.myControl.valueChanges.pipe(
            startWith(''),
            map(value => this._filter(value))
        );
    }

    onOptionSelected() {
        this.addIngredient(this.ingredientSelection);
    }

    addIngredient(ingredient: string) {
        console.log(`adding ingredient ${ingredient}`);
        this.ingredientsList.push(ingredient);
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
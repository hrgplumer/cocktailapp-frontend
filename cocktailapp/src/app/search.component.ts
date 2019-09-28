import { Component, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { EventEmitter } from '@angular/core';

@Component({
    selector: 'search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

    myControl = new FormControl();
    options: string[] = ['One', 'Two', 'Three'];
    filteredOptions: Observable<string[]>;

    ingredientSelection: string;

    @Output()
    addedIngredient = new EventEmitter<string>();

    @Output()
    deletedIngredient = new EventEmitter<string>();

    ngOnInit() {
        this.filteredOptions = this.myControl.valueChanges.pipe(
            startWith(''),
            map(value => this._filter(value))
        );
    }

    onOptionSelected() {
        this.addIngredient(this.ingredientSelection);
    }

    addIngredient(ingredient:string) {
        console.log(`adding ingredient ${ingredient}`);
        this.addedIngredient.emit(ingredient);
    }

    deleteIngredient(ingredient: string) {
        console.log(`deleting ingredient ${ingredient}`);
        this.deletedIngredient.emit(ingredient);
    }

    private _filter(value: string): string[] {
        const filterValue = value.toLowerCase();

        return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
    }
}
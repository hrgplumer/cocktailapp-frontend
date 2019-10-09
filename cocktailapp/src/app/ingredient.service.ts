import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from './ingredient.interface';

@Injectable()
export class IngredientService {

    private ingredients = new Subject<string>();
    currentIngredients = this.ingredients.asObservable();

    ingredientList: Array<Ingredient>;

    constructor() {
        this.ingredientList = new Array<Ingredient>();
    }

    /**
     * Adds an ingredient to the list and updates the observable
     * @param ing The Ingredient to add.
     */
    addIngredient(ing: Ingredient) {
        this.ingredientList.push(ing);
        this.updateIngredients();
    }

    /**
     * Remove an ingredient from the list.
     * @param ing The Ingredient to remove
     */
    removeIngredient(ing: string) {
        this.ingredientList = this.ingredientList.filter(element => {
            return element.name !== ing;
        });
        this.updateIngredients();
    }

    /**
     * Updates the ingredients observable with the latest list of ingredients.
     */
    updateIngredients() {
        this.ingredients.next(this.joinList<Ingredient>(this.ingredientList, ',', (ing) => ing.name));
    }

    private joinList<T>(list: Array<T>, char: string, mapper): string {
        return list.map(mapper).join(char);
      }

}
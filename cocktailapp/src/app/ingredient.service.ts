import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from './ingredient.interface';
import { UtilitiesService } from './utilities.service';

@Injectable()
export class IngredientService {
    private ingredients = new Subject<string>();
    currentIngredients = this.ingredients.asObservable();
    ingredientList: Array<Ingredient>;

    constructor(private utils: UtilitiesService) {
        this.ingredientList = new Array<Ingredient>();
    }

    /**
     * Adds an ingredient to the list and updates the observable
     * @param ing The Ingredient to add.
     */
    addIngredient(ing: Ingredient) {
        if (!this.ingredientList.find(i => i.name === ing.name)) {
            this.ingredientList.push(ing);
            this.updateIngredients();
        }
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
        const updatedIngredients = this.utils.joinList<Ingredient>(this.ingredientList, ',', (ing) => ing.name);
        this.ingredients.next(updatedIngredients);
    }

    /**
     * Get the current ingredients list as a comma delimited string.
     */
    getIngredients() {
        return this.utils.joinList<Ingredient>(this.ingredientList, ',', (ing) => ing.name);
    }
}

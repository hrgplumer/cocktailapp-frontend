import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Ingredient } from './ingredient.interface';

@Injectable()
export class IngredientService {

    private ingredient = new BehaviorSubject<Ingredient>(<Ingredient>{});
    currentIngredient = this.ingredient.asObservable();

    private ingredientList: Array<Ingredient>;

    constructor() {
        this.ingredientList = new Array<Ingredient>();
    }

    addIngredient(ing: Ingredient) {
        this.ingredientList.push(ing);
        this.ingredient.next(ing);
    }

    removeIngredient(ing: string) {
        this.ingredientList = this.ingredientList.filter(element => {
            return element.name !== ing;
        });
    }

}
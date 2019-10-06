import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Cocktail } from './cocktail.interface';

@Component({
    selector: 'cocktail',
    templateUrl: './cocktail.component.html',
    styleUrls: ['./cocktail.component.css']
})
export class CocktailComponent {

    constructor() {
    }

    @Input()
    cocktail: Cocktail;
}
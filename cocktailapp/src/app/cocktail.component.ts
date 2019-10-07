import { Component, Input } from '@angular/core';
import { Cocktail } from './cocktail.interface';

@Component({
    selector: 'cocktail',
    templateUrl: './cocktail.component.html',
    styleUrls: ['./cocktail.component.css']
})
export class CocktailComponent {
    @Input()
    cocktail: Cocktail;
}
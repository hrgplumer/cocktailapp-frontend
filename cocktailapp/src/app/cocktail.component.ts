import { Component, Input } from '@angular/core';
import { Cocktail } from './cocktail.interface';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'cocktail',
    templateUrl: './cocktail.component.html',
    styleUrls: ['./cocktail.component.css']
})
export class CocktailComponent {
    @Input()
    cocktail: Cocktail;
}

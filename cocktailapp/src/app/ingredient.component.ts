import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { faTrash, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { CocktailDbService } from './cocktaildb.service';

@Component({
  selector: 'ingredient',
  templateUrl: './ingredient.component.html',
  styleUrls: ['./ingredient.component.css']
})
export class IngredientComponent implements OnInit {

  constructor(private api: CocktailDbService) {
    this.deleted = new EventEmitter<string>();
  }

  ngOnInit() {
    this.api.getIngredientByName(this.ingredientName).subscribe((ing: any) => {
      let theIngredient = ing.ingredients[0];
      // Figure out a way to not display this stuff until done. Promise/observable?
      this.ingredient = this.createIngredient(
        theIngredient.idIngredient,
        theIngredient.strIngredient,
        theIngredient.strDescription,
        theIngredient.strType,
        theIngredient.strABV);
    });
  }

  faTrash: IconDefinition = faTrash;

  @Input()
  ingredientName: string;

  @Output()
  deleted: EventEmitter<string>;

  ingredient: Ingredient = {
    id: null,
    name: null,
    description: null,
    type: null,
    abv: null
  };

  delete() {
    this.deleted.emit(this.ingredientName);
  }

  private createIngredient(id: string, name: string, description: string, type: string, abv: string): Ingredient {
    return {
      id: id,
      name: name,
      description: description,
      type: type,
      abv: abv
    };
  }

}

interface Ingredient {
  id: string;
  name: string;
  description: string;
  type: string;
  abv: string;
}

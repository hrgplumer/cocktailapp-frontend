import { Component, Output, EventEmitter, Input } from '@angular/core';
import { faTrash, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Ingredient } from './ingredient.interface';

@Component({
  selector: 'ingredient',
  templateUrl: './ingredient.component.html',
  styleUrls: ['./ingredient.component.css']
})
export class IngredientComponent {

  constructor() {
    this.deleted = new EventEmitter<string>();
  }

  faTrash: IconDefinition = faTrash;

  @Input()
  ingredient: Ingredient;

  @Output()
  deleted: EventEmitter<string>;

  delete() {
    this.deleted.emit(this.ingredient.name);
  }
}
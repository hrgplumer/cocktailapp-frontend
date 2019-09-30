import { Component, Output, EventEmitter, Input } from '@angular/core';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'ingredient',
  templateUrl: './ingredient.component.html',
  styleUrls: ['./ingredient.component.css']
})
export class IngredientComponent {

  faTrash = faTrash;

  @Input()
  ingredient: string;

  @Output()
  deleted: EventEmitter<string>;

  constructor() {
    this.deleted = new EventEmitter<string>();
  }

  delete() {
    this.deleted.emit(this.ingredient);
  }

}

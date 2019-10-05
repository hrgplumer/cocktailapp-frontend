import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { faTrash, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Ingredient } from './ingredient.interface';

@Component({
  selector: 'ingredient',
  templateUrl: './ingredient.component.html',
  styleUrls: ['./ingredient.component.css']
})
export class IngredientComponent implements OnInit {

  constructor() {
    this.deleted = new EventEmitter<string>();
  }

  ngOnInit() {

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
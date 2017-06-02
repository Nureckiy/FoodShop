import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Dish } from '../dish.model';


@Component({
  selector: 'menu-dishes-list',
  templateUrl: './dishes-list.component.html',
  styleUrls: [ './dishes-list.component.scss' ]
})
export class DishesListComponent {
  @Input() dishes: Dish[];
  @Output() load = new EventEmitter<number>();
}

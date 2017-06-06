import { Component } from '@angular/core';
import { State } from '../../reducers/index';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Dish } from '../dishes/dish.model';
import * as dishActions from '../../actions/dish.action';


@Component({
  selector: 'menu-basket',
  templateUrl: './basket.component.html',
  styleUrls: [ './basket.component.scss' ]
})
export class BasketComponent {
  dishState: Observable<any>;

  updateSelected(dish: Dish) {
    this.store.dispatch(new dishActions.UpdateSelectedDishes(dish));
  }

  constructor(private store: Store<State>) {
    this.dishState = store.select('dishes');
  }
}

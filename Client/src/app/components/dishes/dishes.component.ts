import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../../reducers/index';
import { Observable } from 'rxjs';
import * as dishActions from '../../actions/dish.action';
import { ActivatedRoute } from '@angular/router';
import { Dish } from './dish.model';

@Component({
  selector: 'menu-dishes',
  templateUrl: './dishes.component.html',
  styleUrls: [ './dishes.component.scss' ]
})
export class DishesComponent implements OnInit {
  dishState: Observable<any>;
  title = 'Оцените наше меню!';
  subtitle = 'интернет-магазин вкусностей';
  category: string;

  constructor(
    private store: Store<State>,
    private route: ActivatedRoute
  ) {
    this.dishState = store.select('dishes');
  }

  ngOnInit(): void {
    this.route.params
      .select<string>('category')
      .subscribe(category => this.uploadDishes(category));
  }

  uploadDishes(category: string): void {
    if (category) {
      this.getDishesByCategoryName(category);
    } else {
      this.getPopularDishes(10);
    }
  }

  getPopularDishes(count: number) {
    this.store.dispatch(new dishActions.GetPopularAction(count));
  }

  getDishesByCategoryName(category: string) {
    this.store.dispatch(new dishActions.GetDishesByCategoryName(category));
  }

  updateSelected(res: Dish): void {
    this.store.dispatch(new dishActions.UpdateSelectedDishes(res));
  }
}

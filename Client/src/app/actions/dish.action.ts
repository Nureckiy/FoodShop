import { Action } from '@ngrx/store';
import {Dish} from '../components/dishes/dish.model';

export const ActionTypes = {
  GET_POPULAR: '[Dish] Get Popular',
  GET_POPULAR_SUCCESS: '[Dish] Get Popular Success',
  GET_POPULAR_FAIL: '[Dish] Get Popular Fail',
  GET_BY_CATEGORY_NAME: '[Dish] Get By Category Name',
  GET_BY_CATEGORY_NAME_SUCCESS: '[Dish] Get By Category Name Success',
  GET_BY_CATEGORY_NAME_FAIL: '[Dish] Get By Category Name Fail',
  UPDATE_SELECTED_DISHES: '[Dish] Update Selected Dishes'
};

export class GetPopularAction implements Action {
  readonly type = ActionTypes.GET_POPULAR;

  constructor(public payload: number) {}
}

export class GetPopularSuccessAction implements Action {
  readonly type = ActionTypes.GET_POPULAR_SUCCESS;

  constructor(public payload: Dish[]) {}
}

export class GetPopularFail implements Action {
  readonly type = ActionTypes.GET_POPULAR_FAIL;

  constructor(public payload: string) {}
}

export class GetDishesByCategoryName implements Action {
  readonly type = ActionTypes.GET_BY_CATEGORY_NAME;

  constructor(public payload: string) {}
}

export class GetDishesByCategoryNameSuccess implements Action {
  readonly type = ActionTypes.GET_BY_CATEGORY_NAME_SUCCESS;

  constructor(public payload: Dish[]) {}
}

export class GetDishesByCategoryNameFail implements Action {
  readonly type = ActionTypes.GET_BY_CATEGORY_NAME_FAIL;

  constructor(public payload: string) {}
}

export class UpdateSelectedDishes implements Action {
  readonly type = ActionTypes.UPDATE_SELECTED_DISHES;

  constructor(public payload: Dish) {}
}

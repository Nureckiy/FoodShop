import { Action } from '@ngrx/store';

import { Dish } from '../components/dishes/dish.model';
import { ActionTypes } from '../actions/dish.action';
import * as utils from '../utils/utils';

export type State = {
  dishes: Dish[];
  selectedDishes: Dish[],
  activeRequestStatus: boolean;
  requestError: Error;
};

const initialState: State = {
  dishes: [],
  selectedDishes: [],
  activeRequestStatus: false,
  requestError: null
};

export default function (state = initialState, action: Action): State {
  switch (action.type) {
    case ActionTypes.GET_POPULAR:
    case ActionTypes.GET_BY_CATEGORY_NAME:
      return {
        ...state,
        activeRequestStatus: true
      };
    case ActionTypes.GET_POPULAR_SUCCESS:
    case ActionTypes.GET_BY_CATEGORY_NAME_SUCCESS:
      return {
        ...state,
        dishes: action.payload,
        activeRequestStatus: false
      };
    case ActionTypes.GET_POPULAR_FAIL:
    case ActionTypes.GET_BY_CATEGORY_NAME_FAIL:
      return {
        ...state,
        requestError: action.payload,
        activeRequestStatus: false
      };
    case ActionTypes.UPDATE_SELECTED_DISHES:
      return {
        ...state,
        selectedDishes: utils.mergeSelectedDishes(Object.assign([], state.selectedDishes), action.payload)
      };
    default: return state;
  }
}

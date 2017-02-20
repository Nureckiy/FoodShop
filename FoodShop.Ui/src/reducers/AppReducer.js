import * as types from '../constants/AppConstants';
import * as utils from '../utils/utils';

const initialState = {
  selectedGoods: []
};

export default function AppReducer(state = initialState, action) {
  switch (action.type) {

    case types.SELECT_MEAL:
      return {
        ...state,
        selectedGoods: mergeMeals(state.selectedGoods, action.selected)
      };

    default:
      return state;
  }
}

function mergeMeals(oldGoods, newGoods) {
  return utils.mergeGoods(oldGoods, newGoods);
}

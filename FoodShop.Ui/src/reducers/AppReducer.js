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
        selectedGoods: utils.mergeGoods(state.selectedGoods, action.good)
      };

    case types.CLEAR_SELECTED:
      return {
        ...state,
        selectedGoods: []
      };

    case types.CHANGE_CONFIGURATION:
      return {
        ...state,
        selectedGoods: utils.changeConfiguration(state.selectedGoods, action.configuration)
      };

    default:
      return state;
  }
}

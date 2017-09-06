import * as types from '../constants/MenuConstants';
import * as utils from '../utils/utils';

const initialState = {
  dishes: [],
  selectedDishes: [],
  activeRequestStatus: false,
  requestError: false,
  availableAddresses: []
};

export default function MenuReducer(state = initialState, action) {
  switch (action.type) {

    case types.GET_DISH:
      return {
        ...state,
        activeRequestStatus: true
      };

    case types.GET_DISH_FAIL:
      return {
        ...state,
        activeRequestStatus: false,
        requestError: true
      };

    case types.GET_DISH_SUCCESS:
      return {
        ...state,
        dishes: action.data,
        activeRequestStatus: false
      };

    case types.SELECT_DISH:
      return {
        ...state,
        selectedDishes: utils.mergeDishToSelectedArray(state.selectedDishes, action.good)
      };

    case types.CLEAR_SELECTED_DISHES:
      return {
        ...state,
        selectedDishes: []
      };

    case types.CHANGE_DISH_PORTION:
      return {
        ...state,
        selectedDishes: utils.changeConfigurationsNumber(state.selectedDishes, action.configuration)
      };

    case types.UPDATE_TOTAL_SUCCESS:
      return {
        ...state,
        total: action.data
      };

    case types.ADD_ORDER_SUCCSESS:
      return {
        ...state,
        selectedDishes: []
      };

    case types.GET_AVAILABLE_ADDRESSES_SUCCESS:
      return {
        ...state,
        availableAddresses: action.data
      };

    case types.CREATE_DISH_SUCCESS:
    case types.EDIT_DISH_SUCCESS:
      return {
        ...state,
        dishes: utils.mergeReturnedItem(state.dishes, action.data, action.currentCategory)
      };

    case types.REMOVE_DISH_SUCCESS:
      return {
        ...state,
        dishes: utils.removeElementFromArrayById(state.dishes, action.id)
      };

    default:
      return state;
  }
}

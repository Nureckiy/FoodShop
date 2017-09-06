import * as types from '../constants/MenuConstants';
import service from '../service/service';
import * as utils from '../utils/utils';
import { createAsync } from './ActionCreator';

export function getDishes(data) {
  return createAsync(service.getDishesByCategoryName,
    types.GET_DISH,
    types.GET_DISH_SUCCESS,
    types.GET_DISH_FAIL,
    data
  );
}

export function getPopularDishes(count) {
  return createAsync(service.getPopularDishes,
    types.GET_DISH,
    types.GET_DISH_SUCCESS,
    types.GET_DISH_FAIL,
    count
  );
}

export function selectDish(good) {
  return {
    type: types.SELECT_DISH,
    good
  };
}

export function clearSelected() {
  return {
    type: types.CLEAR_SELECTED_DISHES,
  };
}

export function changeConfiguration(configuration) {
  return {
    type: types.CHANGE_DISH_PORTION,
    configuration
  };
}

export function addOrder(selected, deliveryDetails) {
  const portions = utils.makePortionsList(selected);
  const data = { portions, ...deliveryDetails };

  return createAsync(service.addOrder,
    types.ADD_ORDER,
    types.ADD_ORDER_SUCCSESS,
    types.ADD_ORDER_FAIL,
    data
  );
}

export function getAvailableAddresses() {
  return createAsync(service.getAvailableAddresses,
    types.GET_AVAILABLE_ADDRESSES,
    types.GET_AVAILABLE_ADDRESSES_SUCCESS,
    types.GET_AVAILABLE_ADDRESSES_FAIL
  );
}

export function createDish(dish, currentCategory) {
  return createAsync(service.addDish,
    types.CREATE_DISH,
    types.CREATE_DISH_SUCCESS,
    types.CREATE_DISH_FAIL,
    dish, { currentCategory }
  );
}

export function editDish(dish, currentCategory) {
  return createAsync(service.editDish,
    types.EDIT_DISH,
    types.EDIT_DISH_SUCCESS,
    types.EDIT_DISH_FAIL,
    dish, { currentCategory }
  );
}

export function removeDish(id) {
  return createAsync(service.removeDish,
    types.REMOVE_DISH,
    types.REMOVE_DISH_SUCCESS,
    types.REMOVE_DISH_FAIL,
    id, { id }
  );
}
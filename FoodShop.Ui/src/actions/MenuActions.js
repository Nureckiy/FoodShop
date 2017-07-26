import * as types from '../constants/MenuConstants';
import service from '../service/service';
import * as utils from '../utils/utils';

export function getDishes(data) {
  return (dispatch) => {
    dispatch({
      type: types.GET_DISH
    });

    service.getDishesByCategoryName(data, success, fail);

    function success(data, status) {
      dispatch({
        type: types.GET_DISH_SUCCESS,
        data,
        status
      });
    }

    function fail(data, status) {
      dispatch({
        type: types.GET_DISH_FAIL,
        data,
        status
      });
    }
  };
}

export function getPopularDishes(count) {
  return (dispatch) => {
    dispatch({
      type: types.GET_DISH
    });

    service.getPopularDishes(count, success, fail);

    function success(data, status) {
      dispatch({
        type: types.GET_DISH_SUCCESS,
        data,
        status
      });
    }

    function fail(data, status) {
      dispatch({
        type: types.GET_DISH_FAIL,
        data,
        status
      });
    }
  };
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

export function updateTotal(goods) {
  return (dispatch) => {
    dispatch({
      type: types.UPDATE_TOTAL
    });

    service.getTotal(goods, success, fail);

    function success(data, status) {
      dispatch({
        type: types.UPDATE_TOTAL_SUCCESS,
        data,
        status
      });
    }

    function fail(data, status) {
      dispatch({
        type: types.UPDATE_TOTAL_FAIL,
        data,
        status
      });
    }
  };
}

export function addOrder(selected, deliveryDetails) {
  return (dispatch) => {
    dispatch({
      type: types.ADD_ORDER
    });

    const portions = utils.makePortionsList(selected);

    service.addOrder({ portions, ...deliveryDetails }, success, fail);

    function success(data, status) {
      dispatch({
        type: types.ADD_ORDER_SUCCSESS,
        data,
        status
      });
    }

    function fail(data, status) {
      dispatch({
        type: types.ADD_ORDER_FAIL,
        data,
        status
      });
    }
  };
}

export function getAvailableAddresses() {
  return (dispatch) => {
    dispatch({
      type: types.GET_AVAILABLE_ADDRESSES
    });

    service.getAvailableAddresses(success, fail);

    function success(data, status) {
      dispatch({
        type: types.GET_AVAILABLE_ADDRESSES_SUCCESS,
        data,
        status
      });
    }

    function fail(data, status) {
      dispatch({
        type: types.GET_AVAILABLE_ADDRESSES_FAIL,
        data,
        status
      });
    }
  };
}
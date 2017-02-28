/*eslint no-unused-vars: "off"*/
import * as types from '../constants/UserProfileConstants';
import service from '../service/service';

export function getSubscriptions() {
  return (dispatch) => {
    dispatch({
      type: types.GET_PROFILE_SUBSCRIPTIONS
    });

    service.getSubscriptions(success, fail);

    function success(data, status) {
      dispatch({
        type: types.GET_PROFILE_SUBSCRIPTIONS_SUCCESS,
        data,
        status
      });
    }

    function fail(data, status) {
      dispatch({
        type: types.GET_PROFILE_SUBSCRIPTIONS_FAIL,
        data,
        status
      });
    }
  };
}

export function getAllSubscriptions() {
  return (dispatch) => {
    dispatch({
      type: types.GET_ALL_SUBSCRIPTIONS
    });

    service.getAllSubscriptions(success, fail);

    function success(data, status) {
      dispatch({
        type: types.GET_ALL_SUBSCRIPTIONS_SUCCESS,
        data,
        status
      });
    }

    function fail(data, status) {
      dispatch({
        type: types.GET_ALL_SUBSCRIPTIONS_FAIL,
        data,
        status
      });
    }
  };
}

export function getOrders() {
  return (dispatch) => {
    dispatch({
      type: types.GET_ORDERS
    });

    service.getOrders(success, fail);

    function success(data, status) {
      dispatch({
        type: types.GET_ORDERS_SUCCESS,
        data,
        status
      });
    }

    function fail(data, status) {
      dispatch({
        type: types.GET_ORDERS_FAIL,
        data,
        status
      });
    }
  };
}

export function saveUserSubscriptions(subscriptions) {
  return (dispatch) => {
    dispatch({
      type: types.SAVE_SUBSCRIPTIONS
    });

    service.saveUserSubscriptions(subscriptions, success, fail);

    function success(data, status) {
      dispatch({
        type: types.SAVE_SUBSCRIPTIONS_SUCCESS,
        data,
        status
      });
    }

    function fail(data, status) {
      dispatch({
        type: types.SAVE_SUBSCRIPTIONS_FAIL,
        data,
        status
      });
    }
  };
}

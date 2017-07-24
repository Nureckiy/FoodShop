/*eslint no-unused-vars: "off"*/
import * as types from '../constants/UserProfileConstants';
import service from '../service/service';

export function getBookings() {
  return (dispatch) => {
    dispatch({
      type: types.GET_BOOKINGS
    });

    service.getBookings(success, fail);

    function success(data, status) {
      dispatch({
        type: types.GET_BOOKINGS_SUCCESS,
        data,
        status
      });
    }

    function fail(data, status) {
      dispatch({
        type: types.GET_BOOKINGS_FAIL,
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

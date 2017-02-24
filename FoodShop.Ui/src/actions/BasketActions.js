import * as types from '../constants/BasketConstants';
import service from '../service/service';

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

export function addOrder(configurationsList, deliveryDetails) {
  return (dispatch) => {
    dispatch({
      type: types.ADD_ORDER
    });

    service.addOrder({configurationsList, ...deliveryDetails}, success, fail);

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

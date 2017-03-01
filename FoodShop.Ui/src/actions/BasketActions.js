/*eslint no-unused-vars: "off"*/
import * as types from '../constants/BasketConstants';
import service from '../service/service';
import * as utils from '../utils/utils';

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

    const configurationsList = utils.makeConfigurationsList(selected);

    service.addOrder({configurationsList, ...deliveryDetails, UserId: 'UserId'}, success, fail);

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

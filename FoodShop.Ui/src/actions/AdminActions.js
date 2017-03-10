import * as types from '../constants/AdminConstants';
import service from '../service/service';

export function getAllSubscriptions() {
  return (dispatch) => {
    dispatch({
      type: types.GET_SUBSCRIPTIONS
    });

    service.getAllSubscriptions(success, fail);

    function success(data, status) {
      dispatch({
        type: types.GET_SUBSCRIPTIONS_SUCCESS,
        data,
        status
      });
    }

    function fail(data, status) {
      dispatch({
        type: types.GET_SUBSCRIPTIONS_FAIL,
        data,
        status
      });
    }
  };
}

export function publishSubscriptions(subscriptions) {
  return (dispatch) => {
    dispatch({
      type: types.PUBLISH_SUBSCRIPTIONS
    });

    service.publishSubscriptions(subscriptions, success, fail);

    function success(data, status) {
      dispatch({
        type: types.PUBLISH_SUBSCRIPTIONS_SUCCESS,
        data,
        status
      });
    }

    function fail(data, status) {
      dispatch({
        type: types.PUBLISH_SUBSCRIPTIONS_FAIL,
        data,
        status
      });
    }
  };
}

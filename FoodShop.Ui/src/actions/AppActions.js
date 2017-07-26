import * as types from '../constants/AppConstants';
import service from '../service/service';

export function sendFeedback(feedback) {
  return (dispatch) => {
    dispatch({
      type: types.SEND_FEEDBACK
    });

    service.sendFeedback(feedback, success, fail);

    function success(data, status) {
      dispatch({
        type: types.SEND_FEEDBACK_SUCCESS,
        data,
        status
      });
    }

    function fail(data, status) {
      dispatch({
        type: types.SEND_FEEDBACK_FAIL,
        data,
        status
      });
    }
  };
}

export function createDish(dish) {
  return (dispatch) => {
    dispatch({
      type: types.CREATE_DISH
    });

    service.addDish(dish, success, fail);

    function success(data, status) {
      dispatch({
        type: types.CREATE_DISH_SUCCESS,
        data,
        status
      });
    }

    function fail(data, status) {
      dispatch({
        type: types.CREATE_DISH_FAIL,
        data,
        status
      });
    }
  };
}

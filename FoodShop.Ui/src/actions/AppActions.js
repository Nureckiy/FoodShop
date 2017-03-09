import * as types from '../constants/AppConstants';
import service from '../service/service';

export function selectGoods(good) {
  return {
    type: types.SELECT_MEAL,
    good
  };
}

export function clearSelected() {
  return {
    type: types.CLEAR_SELECTED_MEALS,
  };
}

export function changeConfiguration(configuration) {
  return {
    type: types.CHANGE_MEAL_CONFIGURATION,
    configuration
  };
}

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

/*eslint no-unused-vars: "off"*/
import * as types from '../constants/UserProfileConstants';
import service from '../service/service';
import auth0 from 'auth0-js';

export function getSubscriptions(userId) {
  return (dispatch) => {
    dispatch({
      type: types.GET_PROFILE_SUBSCRIPTIONS
    });

    service.getSubscriptions({userId}, success, fail);

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

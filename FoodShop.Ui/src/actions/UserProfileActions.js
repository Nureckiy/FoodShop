/*eslint no-unused-vars: "off"*/
import * as types from '../constants/UserProfileConstants';
import service from '../service/service';
import auth0 from 'auth0-js';

export function getSubstitutions(userId) {
  return (dispatch) => {
    dispatch({
      type: types.GET_PROFILE_SUBSTITUTIONS
    });

    service.getSubstitutions({userId}, success, fail);

    function success(data, status) {
      dispatch({
        type: types.GET_PROFILE_SUBSTITUTIONS_SUCCESS,
        data,
        status
      });
    }

    function fail(data, status) {
      dispatch({
        type: types.GET_PROFILE_SUBSTITUTIONS_FAIL,
        data,
        status
      });
    }
  };
}

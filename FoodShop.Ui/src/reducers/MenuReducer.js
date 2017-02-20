/*eslint no-unused-vars: "off"*/
import * as types from '../constants/MenuConstants';

const initialState = {
  goods: [],
  activeRequestStatus: false,
  requestError: false
};

export default function MenuReducer(state = initialState, action) {
  switch (action.type) {

    case types.GET_GOOD:
      return {
        ...state,
        activeRequestStatus: true
      };

    case types.GET_GOOD_FAIL:
      return {
        ...state,
        activeRequestStatus: false,
        requestError: true
      };

    case types.GET_GOOD_SUCCESS:
      return {
        ...state,
        goods: action.data,
        activeRequestStatus: false
      };

    default:
      return state;
  }
}


import * as types from '../constants/AdminConstants';

const initialState = {
  activeRequestStatus: false,
  subscriptions: []
};

export default function AdminReducer(state = initialState, action) {
    switch (action.type) {

      case types.GET_SUBSCRIPTIONS:
        return {
          ...state,
          activeRequestStatus: true
        };

      case types.GET_SUBSCRIPTIONS_SUCCESS:
        return {
          ...state,
          activeRequestStatus: false,
          subscriptions: action.data
        };

        default:
            return state;
    }
}
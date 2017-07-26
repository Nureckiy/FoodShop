import * as types from '../constants/AdminConstants';

const initialState = {
  activeRequestStatus: false,
  subscriptions: []
};

export default function AdminReducer(state = initialState, action) {
    switch (action.type) {

      case types.ADD_DISH:
        return {
          ...state,
          activeRequestStatus: true
        };

      case types.ADD_DISH_SUCCESS:
        return {
          ...state,
          activeRequestStatus: false,
          subscriptions: action.data
        };

        default:
            return state;
    }
}
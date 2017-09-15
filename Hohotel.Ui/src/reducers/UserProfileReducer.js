import * as types from '../constants/UserProfileConstants';

const initialState = {
  bookings: [],
  orders: [],
  activeRequestStatus: false
};

export default function UserProfileReducer(state = initialState, action) {
  switch (action.type) {

    case types.GET_BOOKINGS:
    case types.GET_ORDERS:
      return {
        ...state,
        activeRequestStatus: true
      };

    case types.GET_BOOKINGS_SUCCESS:
      return {
        ...state,
        bookings: action.data,
        activeRequestStatus: false
      };

    case types.GET_ORDERS_SUCCESS:
      return {
        ...state,
        orders: action.data,
        activeRequestStatus: false
      };

    case types.GET_ORDERS_FAIL:
    case types.GET_BOOKINGS_FAIL:
      return {
        ...state,
        activeRequestStatus: false
      };

    default:
      return state;
  }
}
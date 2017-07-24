import * as types from '../constants/UserProfileConstants';

const initialState = {
  bookings: [],
  orders: []
};

export default function UserProfileReducer(state = initialState, action) {
  switch (action.type) {

    case types.GET_BOOKINGS_SUCCESS:
      return {
        ...state,
        bookings: action.data
      };

    case types.GET_ORDERS_SUCCESS:
      return {
        ...state,
        orders: action.data
      };

    default:
      return state;
  }
}
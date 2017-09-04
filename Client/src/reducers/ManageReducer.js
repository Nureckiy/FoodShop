import * as types from '../constants/ManageConstants';
import * as utils from '../utils/utils';

const initialState = {
  bookings: [],
  orders: []
};

export default function ManageReducer(state = initialState, action) {
  switch (action.type) {

    case types.GET_ALL_BOOKINGS_SUCCESS:
      return {
        ...state,
        bookings: action.data
      };

    case types.CHANGE_BOOKING_STATUS_SUCCESS:
      return {
        ...state,
        bookings: utils.mergeElementToArrayById(state.bookings, action.data)
      };

    case types.GET_ALL_ORDERS_SUCCESS:
      return {
        ...state,
        orders: action.data
      };

    case types.CHANGE_ORDER_STATUS_SUCCESS:
      return {
        ...state,
        orders: utils.mergeElementToArrayById(state.orders, action.data)
      };

    default:
      return state;
  }
}

import * as types from '../constants/ManageConstants';
import * as utils from '../utils/utils';

const initialState = {
  bookings: [],
  currentBookingsPage: 1,
  bookingsTotal: 0,
  orders: [],
  currentOrdersPage: 1,
  ordersTotal: 0,
  activeRequestStatus: false
};

export default function ManageReducer(state = initialState, action) {
  switch (action.type) {

    case types.SORT_BOOKINGS:
    case types.SORT_ORDERS:
      return {
        ...state,
        activeRequestStatus: true
      };

    case types.SORT_BOOKINGS_SUCCESS:
      return {
        ...state,
        bookings: action.data.items,
        currentBookingsPage: action.pageNumber,
        bookingsTotal: action.data.totalItems,
        activeRequestStatus: false
      };

    case types.CHANGE_BOOKING_STATUS_SUCCESS:
      return {
        ...state,
        bookings: utils.mergeElementToArrayById(state.bookings, action.data)
      };

    case types.SORT_ORDERS_SUCCESS:
      return {
        ...state,
        orders: action.data.items,
        currentOrdersPage: action.pageNumber,
        ordersTotal: action.data.totalItems,
        activeRequestStatus: false
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

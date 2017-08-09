import * as types from '../constants/ManageConstants';
import * as utils from '../utils/utils';

const initialState = {
  bookings: [],
  orders: [],
  bookingsInProcess: [],
  ordersInProcess: [],
  activeRequestStatus: false,
};

export default function ManageReducer(state = initialState, action) {
  switch (action.type) {

    case types.GET_ALL_BOOKINGS:
      return {
        ...state,
        activeRequestStatus: true
      };

    case types.GET_ALL_BOOKINGS_SUCCESS:
      return {
        ...state,
        activeRequestStatus: false,
        bookings: action.data
      };

    case types.CHANGE_BOOKING_STATUS:
      return {
        ...state,
        bookingsInProcess: utils.setElementToArray(state.bookingsInProcess, action.id)
      };

    case types.CHANGE_BOOKING_STATUS_SUCCESS:
      return {
        ...state,
        bookings: utils.mergeElementToArrayById(state.bookings, action.data),
        bookingsInProcess: utils.removeElementFromArray(state.bookingsInProcess, action.id)
      };

    case types.CHANGE_BOOKING_STATUS_FAIL:
      return {
        ...state,
        bookingsInProcess: utils.removeElementFromArray(state.bookingsInProcess, action.id)
      };

    case types.GET_ALL_ORDERS:
      return {
        ...state,
        activeRequestStatus: true
      };

    case types.GET_ALL_ORDERS_SUCCESS:
      return {
        ...state,
        activeRequestStatus: false,
        orders: action.data
      };

    case types.CHANGE_ORDER_STATUS:
      return {
        ...state,
        ordersInProcess: utils.setElementToArray(state.ordersInProcess, action.id)
      };

    case types.CHANGE_ORDER_STATUS_SUCCESS:
      return {
        ...state,
        orders: utils.mergeElementToArrayById(state.orders, action.data),
        ordersInProcess: utils.removeElementFromArray(state.ordersInProcess, action.id)
      };

    case types.CHANGE_ORDER_STATUS_FAIL:
      return {
        ...state,
        ordersInProcess: utils.removeElementFromArray(state.ordersInProcess, action.id)
      };

    default:
      return state;
  }
}

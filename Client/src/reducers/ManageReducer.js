import * as types from '../constants/ManageConstants';
import * as utils from '../utils/utils';

const initialState = {
  bookings: [],
  orders: [],
  bookingsInProcess: [],
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

    default:
      return state;
  }
}

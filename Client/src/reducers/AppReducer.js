import * as menuTypes from '../constants/MenuConstants';
import * as bookingTypes from '../constants/BookingConstants';

const initialState = {
  orderActiveRequestStatus: true,
  isSuccessOrder: false
};

export default function AppReducer(state = initialState, action) {
  switch (action.type) {

    case menuTypes.ADD_ORDER:
      return {
        ...state,
        orderActiveRequestStatus: true
      };

    case menuTypes.ADD_ORDER_SUCCSESS:
      return {
        ...state,
        orderActiveRequestStatus: false,
        isSuccessOrder: true
      };

    case menuTypes.ADD_ORDER_FAIL:
      return {
        ...state,
        orderActiveRequestStatus: false,
        isSuccessOrder: false
      };

    case bookingTypes.BOOK:
      return {
        ...state,
        orderActiveRequestStatus: true
      };

    case bookingTypes.BOOK_SUCCESS:
      return {
        ...state,
        orderActiveRequestStatus: false,
        isSuccessOrder: true
      };

    case bookingTypes.BOOK_FAIL:
      return {
        ...state,
        orderActiveRequestStatus: false,
        isSuccessOrder: false
      };

    default:
      return state;
  }
}

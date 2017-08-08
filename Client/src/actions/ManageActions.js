import * as types from '../constants/ManageConstants';
import service from '../service/service';
import { createAsync } from './ActionCreator';

export function getBookings() {
  return createAsync(service.getAllBookings,
    types.GET_ALL_BOOKINGS,
    types.GET_ALL_BOOKINGS_SUCCESS,
    types.GET_ALL_BOOKINGS_FAIL
  );
}

export function changeBookingStatus(id, status) {
  return createAsync(service.changeBookingStatus,
    types.CHANGE_BOOKING_STATUS,
    types.CHANGE_BOOKING_STATUS_SUCCESS,
    types.CHANGE_BOOKING_STATUS_FAIL,
    { id, status }, { id }
  );
}

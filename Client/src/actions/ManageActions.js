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

export function getOrders() {
  return createAsync(service.getAllOrders,
    types.GET_ALL_ORDERS,
    types.GET_ALL_ORDERS_SUCCESS,
    types.GET_ALL_ORDERS_FAIL
  );
}

export function changeOrderStatus(id, status) {
  return createAsync(service.changeOrderStatus,
    types.CHANGE_ORDER_STATUS,
    types.CHANGE_ORDER_STATUS_SUCCESS,
    types.CHANGE_ORDER_STATUS_FAIL,
    { id, status }, { id }
  );
}
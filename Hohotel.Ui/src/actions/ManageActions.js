import * as types from '../constants/ManageConstants';
import service from '../service/service';
import { createAsync } from './ActionCreator';

export function getBookings(pageNumber, itemsCount) {
  return createAsync(service.getAllBookings,
    types.SORT_BOOKINGS,
    types.SORT_BOOKINGS_SUCCESS,
    types.SORT_BOOKINGS_FAIL,
    { pageNumber, itemsCount }, { pageNumber }
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

export function getOrders(pageNumber, itemsCount) {
  return createAsync(service.getAllOrders,
    types.SORT_ORDERS,
    types.SORT_ORDERS_SUCCESS,
    types.SORT_ORDERS_FAIL,
    { pageNumber, itemsCount }, { pageNumber }
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
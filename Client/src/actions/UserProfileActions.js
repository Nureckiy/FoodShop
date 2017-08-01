import * as types from '../constants/UserProfileConstants';
import service from '../service/service';
import { createAsync } from './ActionCreator';

export function getBookings() {
  return createAsync(service.getBookings,
    types.GET_BOOKINGS,
    types.GET_BOOKINGS_SUCCESS,
    types.GET_BOOKINGS_FAIL
  );
}

export function getOrders() {
  return createAsync(service.getOrders,
    types.GET_ORDERS,
    types.GET_ORDERS_SUCCESS,
    types.GET_ORDERS_FAIL,
  );
}
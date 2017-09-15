/*eslint no-unused-vars: "off"*/

import * as types from '../constants/BookingConstants';
import service from '../service/service';
import * as utils from '../utils/utils';
import { createAsync, create } from './ActionCreator';
import translations from '../sources/translations/translations';
import Promise from 'es6-promise';

export function setCurrentRoomCategory(category) {
  return (dispatch) => {
    dispatch({
      type: types.SET_CURRENT_ROOM_CATEGORY,
      category
    });
  };
}

export function getRoomCategories() {
  return createAsync(service.getRoomCategories,
    types.GET_ROOM_CATEGORIES,
    types.GET_ROOM_CATEGORIES_SUCCESS,
    types.GET_ROOM_CATEGORIES_FAIL
  );
}

export function getRoomCategoriesInfo() {
  return createAsync(service.getRoomCategoriesInfo,
    types.GET_ROOM_CATEGORIES_INFO,
    types.GET_ROOM_CATEGORIES_INFO_SUCCESS,
    types.GET_ROOM_CATEGORIES_INFO_FAIL,
  );
}

export function getRoomCategory(id) {
  return createAsync(service.getRoomCategoryById,
    types.GET_ROOMS_CATEGORY_BY_ID,
    types.GET_ROOMS_CATEGORY_BY_ID_SUCCESS,
    types.GET_ROOMS_CATEGORY_BY_ID_FAIL,
    id
  );
}

export function getRooms(id, startDate, endDate) {
  const filter = { categoryId: id, startDate, endDate };
  return createAsync(service.getRooms,
    types.GET_ROOMS,
    types.GET_ROOMS_SUCCESS,
    types.GET_ROOMS_FAIL,
    filter
  );
}

export function addRoom(room) {
  return(dispatch, getState) => {
    dispatch({
      type: types.ADD_ROOM,
      room
    });
    const filter = Object.assign({ roomId: room.id, ...utils.renderDateRange(room)});
    const locale = getState().Intl.locale;
    const messages = translations[locale].messages;

    const success = create(dispatch, types.ADD_ROOM_SUCCESS, { room });
    const fail = create(dispatch, types.ADD_ROOM_FAIL, { room });

    return Promise.resolve(service.checkRoomAvailability(filter))
      .then((isAvailable, status) => {
        if (isAvailable) success(isAvailable, status);
        else throw new Error(messages.roomIsUnavailable);
      })
      .catch((error, status) => {
        fail(error, status);
        throw error;
      });
  };
}

export function deleteRoom(id) {
  return (dispatch) => {
    dispatch({
      type: types.DELETE_ROOM,
      id
    });
  };
}

export function createRoom(data, category) {
  return createAsync(service.addRoom,
    types.CREATE_ROOM,
    types.CREATE_ROOM_SUCCESS,
    types.CREATE_ROOM_FAIL,
    data, { category }
  );
}

export function editRoom(data, category) {
  return createAsync(service.editRoom,
    types.EDIT_ROOM,
    types.EDIT_ROOM_SUCCESS,
    types.EDIT_ROOM_FAIL,
    data, { category }
  );
}

export function removeRoom(id) {
  return createAsync(service.removeRoom,
    types.REMOVE_ROOM,
    types.REMOVE_ROOM_SUCCESS,
    types.REMOVE_ROOM_FAIL,
    id, { id }
  );
}

export function clearSelectedRooms() {
  return (dispatch) => {
    dispatch({
      type: types.CLEAR_SELECTED_ROOMS
    });
  };
}

export function book(data) {
  return createAsync(service.book,
    types.BOOK,
    types.BOOK_SUCCESS,
    types.BOOK_FAIL,
    data
  );
}

export function createRoomCategory(data) {
  return createAsync(service.addRoomCategory,
    types.CREATE_ROOM_CATEGORY,
    types.CREATE_ROOM_CATEGORY_SUCCESS,
    types.CREATE_ROOM_CATEGORY_FAIL,
    data
  );
}

export function editRoomCategory(id) {
  return createAsync(service.editRoomCategory,
    types.EDIT_ROOM_CATEGORY,
    types.EDIT_ROOM_CATEGORY_SUCCESS,
    types.EDIT_ROOM_CATEGORY_FAIL,
    id
  );
}

export function removeRoomCategory(id) {
  return createAsync(service.removeRoomCategory,
    types.REMOVE_ROOM_CATEGORY,
    types.REMOVE_ROOM_CATEGORY_SUCCESS,
    types.REMOVE_ROOM_CATEGORY_FAIL,
    id, { id }
  );
}

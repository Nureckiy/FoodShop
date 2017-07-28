import * as types from '../constants/BookingConstants';
import service from '../service/service';
import * as utils from '../utils/utils';
import { create, createAsync } from './ActionCreator';

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
  return(dispatch) => {
    dispatch({
      type: types.ADD_ROOM,
      room
    });
    const fail = create(dispatch, types.ADD_ROOM_FAIL);
    const filter = Object.assign({ roomId: room.id, ...utils.renderDateRange(room)});
    service.checkRoomAvailability(filter, success, fail);

    function success(data, status) {
      if (data) {
        dispatch({
          type: types.ADD_ROOM_SUCCESS,
          room,
          data,
          status
        });
      } else {
        fail({ message: 'номер недоступен в выбранный промежуток'}, status);
      }
    }
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

export function createRoom(data) {
  return createAsync(service.addRoom,
    types.CREATE_ROOM,
    types.CREATE_ROOM_SUCCESS,
    types.CREATE_ROOM_FAIL,
    data
  );
}

export function editRoom(data) {
  return createAsync(service.editRoom,
    types.EDIT_ROOM,
    types.EDIT_ROOM_SUCCESS,
    types.EDIT_ROOM_FAIL,
    data
  );
}

export function removeRoom(data) {
  return createAsync(service.removeRoom,
    types.REMOVE_ROOM,
    types.REMOVE_ROOM_SUCCESS,
    types.REMOVE_ROOM_FAIL,
    data
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

export function editRoomCategory(data) {
  return createAsync(service.editRoomCategory,
    types.EDIT_ROOM_CATEGORY,
    types.EDIT_ROOM_CATEGORY_SUCCESS,
    types.EDIT_ROOM_CATEGORY_FAIL,
    data
  );
}

export function removeRoomCategory(data) {
  return createAsync(service.removeRoomCategory,
    types.REMOVE_ROOM_CATEGORY,
    types.REMOVE_ROOM_CATEGORY_SUCCESS,
    types.REMOVE_ROOM_CATEGORY_FAIL,
    data
  );
}

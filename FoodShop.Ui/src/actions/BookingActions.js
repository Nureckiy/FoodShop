import * as types from '../constants/BookingConstants';
import service from '../service/service';

export function setCurrentRoomCategory(category) {
  return (dispatch) => {
    dispatch({
      type: types.SET_CURRENT_ROOM_CATEGORY,
      category
    });
  };
}

export function addRoom(room) {
  return (dispatch) => {
    dispatch({
      type: types.ADD_ROOM,
      room
    });
  };
}

export function removeRoom(id) {
  return (dispatch) => {
    dispatch({
      type: types.REMOVE_ROOM,
      id
    });
  };
}

export function getRoomCategories() {
  return (dispatch) => {
    dispatch({
      type: types.GET_ROOM_CATEGORIES
    });

    service.getRoomCategories(success, fail);

    function success(data, status) {
      dispatch({
        type: types.GET_ROOM_CATEGORIES_SUCCESS,
        data,
        status
      });
    }

    function fail(data, status) {
      dispatch({
        type: types.GET_ROOM_CATEGORIES_FAIL,
        data,
        status
      });
    }
  };
}


export function getRoomCategory(id) {
  return (dispatch) => {
    dispatch({
      type: types.GET_ROOMS_CATEGORY_BY_ID
    });

    service.getRoomCategoryById({ id }, success, fail);

    function success(data, status) {
      dispatch({
        type: types.GET_ROOMS_CATEGORY_BY_ID_SUCCESS,
        data,
        status
      });
    }

    function fail(data, status) {
      dispatch({
        type: types.GET_ROOMS_CATEGORY_BY_ID_FAIL,
        data,
        status
      });
    }
  };
}


export function getRooms(categoryId, dateRange) {
  return (dispatch) => {
    dispatch({
      type: types.GET_ROOMS
    });

    const filter = Object.assign({}, { categoryId }, dateRange);

    service.getRooms(filter, success, fail);

    function success(data, status) {
      dispatch({
        type: types.GET_ROOMS_SUCCESS,
        data,
        status
      });
    }

    function fail(data, status) {
      dispatch({
        type: types.GET_ROOMS_FAIL,
        data,
        status
      });
    }
  };
}

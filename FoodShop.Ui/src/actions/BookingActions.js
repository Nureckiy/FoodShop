import * as types from '../constants/BookingConstants';
import service from '../service/service';
import * as utils from '../utils/utils';
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

    service.getRoomCategoryById(id, success, fail);

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


export function getRooms(filter) {
  return (dispatch) => {
    dispatch({
      type: types.GET_ROOMS
    });

    const data = Object.assign({}, filter, utils.renderDateRange(filter));

    service.getRooms(data, success, fail);

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

export function addRoom(room) {
  return(dispatch) => {
    dispatch({
      type: types.ADD_ROOM,
      room
    });
    return new Promise((resolve, reject) => {
      if (!room.arrivalDate || !room.departureDate) {
        fail(room);
        reject(new Error('Введен некорректный временной промежуток'));
      } else {
        service.checkRoomAvailability(Object.assign({
          roomId: room.id,
          ...utils.renderDateRange(room)
        }), success, fail);
      }
    });

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

    function fail(error, status) {
      dispatch({
        type: types.ADD_ROOM_FAIL,
        error,
        room,
        status
      });
    }

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

export function clearSelectedRooms() {
  return (dispatch) => {
    dispatch({
      type: types.CLEAR_SELECTED_ROOMS
    });
  };
}

export function book(values) {
  return (dispatch) => {
    dispatch({
      type: types.BOOK
    });

    return service.book(values, success, fail);

    function success(data, status) {
      dispatch({
        type: types.BOOK_SUCCESS,
        data,
        status
      });
    }

    function fail(data, status) {
      dispatch({
        type: types.BOOK_FAIL,
        data,
        status
      });
    }
  };
}
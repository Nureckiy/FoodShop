import * as types from '../constants/BookingConstants';
import service from '../service/service';
import * as utils from '../utils/utils';

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

export function getRoomCategoriesInfo() {
  return (dispatch) => {
    dispatch({
      type: types.GET_ROOM_CATEGORIES_INFO
    });

    service.getRoomCategoriesInfo(success, fail);

    function success(data, status) {
      dispatch({
        type: types.GET_ROOM_CATEGORIES_INFO_SUCCESS,
        data,
        status
      });
    }

    function fail(data, status) {
      dispatch({
        type: types.GET_ROOM_CATEGORIES_INFO_FAIL,
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

export function getRooms(id, startDate, endDate) {
  return (dispatch) => {
    dispatch({
      type: types.GET_ROOMS
    });

    const filter = { categoryId: id, startDate, endDate };

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

export function addRoom(room) {
  return(dispatch) => {
    dispatch({
      type: types.ADD_ROOM,
      room
    });

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

export function createRoom(data) {
  return (dispatch) => {
    dispatch({
      type: types.CREATE_ROOM
    });

    return service.addRoom(data, success, fail);

    function success(data, status) {
      dispatch({
        type: types.CREATE_ROOM_SUCCESS,
        data,
        status
      });
    }

    function fail(data, status) {
      dispatch({
        type: types.CREATE_ROOM_FAIL,
        data,
        status
      });
    }
  };
}

export function editRoom(data) {
  return (dispatch) => {
    dispatch({
      type: types.EDIT_ROOM
    });

    return service.editRoom(data, success, fail);

    function success(data, status) {
      dispatch({
        type: types.EDIT_ROOM_SUCCESS,
        data,
        status
      });
    }

    function fail(data, status) {
      dispatch({
        type: types.EDIT_ROOM_FAIL,
        data,
        status
      });
    }
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

export function createRoomCategory(data) {
  return (dispatch) => {
    dispatch({
      type: types.CREATE_ROOM_CATEGORIES
    });

    return service.addRoomCategory(data, success, fail);

    function success(data, status) {
      dispatch({
        type: types.CREATE_ROOM_CATEGORIES_SUCCESS,
        data,
        status
      });
    }

    function fail(data, status) {
      dispatch({
        type: types.CREATE_ROOM_CATEGORIES_FAIL,
        data,
        status
      });
    }
  };
}

export function editRoomCategory(data) {
  return (dispatch) => {
    dispatch({
      type: types.EDIT_ROOM_CATEGORIES
    });

    return service.editRoomCategory(data, success, fail);

    function success(data, status) {
      dispatch({
        type: types.EDIT_ROOM_CATEGORIES_SUCCESS,
        data,
        status
      });
    }

    function fail(data, status) {
      dispatch({
        type: types.EDIT_ROOM_CATEGORIES_FAIL,
        data,
        status
      });
    }
  };
}
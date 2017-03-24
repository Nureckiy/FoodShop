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



import * as types from '../constants/AppConstants';
import service from '../service/service';
import Promise from 'es6-promise';
import * as utils from '../utils/utils';

export function selectGoods(good) {
  return {
    type: types.SELECT_MEAL,
    good
  };
}

export function clearSelected() {
  return {
    type: types.CLEAR_SELECTED_MEALS,
  };
}

export function changeConfiguration(configuration) {
  return {
    type: types.CHANGE_MEAL_CONFIGURATION,
    configuration
  };
}

export function sendFeedback(feedback) {
  return (dispatch) => {
    dispatch({
      type: types.SEND_FEEDBACK
    });

    service.sendFeedback(feedback, success, fail);

    function success(data, status) {
      dispatch({
        type: types.SEND_FEEDBACK_SUCCESS,
        data,
        status
      });
    }

    function fail(data, status) {
      dispatch({
        type: types.SEND_FEEDBACK_FAIL,
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
        reject(new Error('неправильные данные'));
      } else {
        service.checkRoomAvailability(Object.assign({ hotelRoomId: room.id }, utils.renderDateRange(room)), success, fail)
          .then(result => {
            if (!result) {
              reject(new Error('номер недоступен в выбранный промежуток'));
            } else {
              resolve(result);
            }
          });
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
        fail(data, status);
      }
    }

    function fail(data, status) {
      dispatch({
        type: types.ADD_ROOM_FAIL,
        data,
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

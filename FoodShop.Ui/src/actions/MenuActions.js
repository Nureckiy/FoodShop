import * as types from '../constants/MenuConstants';
import service from '../service/service';

export function getGoods(data, byName) {
  return (dispatch) => {
    dispatch({
      type: types.GET_GOOD
    });

    if (byName) {
      service.getGoodsByCategoryName({ name: data }, success, fail);
    } else {
      service.getGoodsByCategoryId({ id: data }, success, fail);
    }

    function success(data, status) {
      dispatch({
        type: types.GET_GOOD_SUCCESS,
        data,
        status
      });
    }

    function fail(data, status) {
      dispatch({
        type: types.GET_GOOD_FAIL,
        data,
        status
      });
    }
  };
}

export function getPopularGoods() {
  return (dispatch) => {
    dispatch({
      type: types.GET_GOOD
    });

    service.getPopularGoods(success, fail);

    function success(data, status) {
      dispatch({
        type: types.GET_GOOD_SUCCESS,
        data,
        status
      });
    }

    function fail(data, status) {
      dispatch({
        type: types.GET_GOOD_FAIL,
        data,
        status
      });
    }
  };
}

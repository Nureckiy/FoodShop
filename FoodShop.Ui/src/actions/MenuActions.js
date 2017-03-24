import * as types from '../constants/MenuConstants';
import service from '../service/service';

export function getGoods(data) {
  return (dispatch) => {
    dispatch({
      type: types.GET_GOOD
    });

    service.getGoodsByCategoryName({ name: data }, success, fail);

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

export function getPopularGoods(count) {
  return (dispatch) => {
    dispatch({
      type: types.GET_GOOD
    });

    service.getPopularGoods({ count }, success, fail);

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

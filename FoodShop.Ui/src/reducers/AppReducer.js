import * as types from '../constants/AppConstants';
import * as utils from '../utils/utils';

const initialState = {
  selectedGoods: [],
  selectedRooms: []
};

export default function AppReducer(state = initialState, action) {
  switch (action.type) {

    case types.SELECT_MEAL:
      return {
        ...state,
        selectedGoods: utils.mergeGoods(state.selectedGoods, action.good)
      };

    case types.CLEAR_SELECTED_MEALS:
      return {
        ...state,
        selectedGoods: []
      };

    case types.CHANGE_MEAL_CONFIGURATION:
      return {
        ...state,
        selectedGoods: utils.changeConfiguration(state.selectedGoods, action.configuration)
      };

    case types.ADD_ROOM_SUCCESS:
      return {
        ...state,
        selectedRooms: utils.mergeSelectedRooms(state.selectedRooms, action)
      };

    case types.REMOVE_ROOM:
      return {
        ...state,
        selectedRooms: utils.removeRoomFromSelected(state.selectedRooms, action)
      };

    default:
      return state;
  }
}

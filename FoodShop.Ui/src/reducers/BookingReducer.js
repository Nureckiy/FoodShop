import * as types from '../constants/BookingConstants';
import * as utils from '../utils/utils';

const initialState = {
  roomCategories: [],
  roomCategoriesInfo: [],
  currentRoomCategory: {},
  filteredRooms: [],
  selectedRooms: []
};

export default function RoomsReducer(state = initialState, action) {
  switch (action.type) {

    case types.SET_CURRENT_ROOM_CATEGORY:
      return {
        ...state,
        currentRoomCategory: action.category
      };

    case types.GET_ROOM_CATEGORIES:
      return {
        ...state,
        activeRequestStatus: true
      };

    case types.GET_ROOM_CATEGORIES_FAIL:
      return {
        ...state,
        activeRequestStatus: false,
        requestError: true
      };

    case types.GET_ROOM_CATEGORIES_SUCCESS:
      return {
        ...state,
        roomCategories: action.data,
        activeRequestStatus: false
      };

    case types.GET_ROOM_CATEGORIES_INFO_SUCCESS:
      return {
        ...state,
        roomCategoriesInfo: action.data
      };

    case types.GET_ROOMS_CATEGORY_BY_ID_SUCCESS:
      return {
        ...state,
        currentRoomCategory: action.data
      };

    case types.GET_ROOMS:
      return {
        ...state,
        activeRequestStatus: true
      };

    case types.GET_ROOMS_FAIL:
      return {
        ...state,
        activeRequestStatus: false,
        requestError: true
      };

    case types.GET_ROOMS_SUCCESS:
      return {
        ...state,
        filteredRooms: action.data,
        activeRequestStatus: false
      };

    case types.ADD_ROOM_SUCCESS:
      return {
        ...state,
        selectedRooms: utils.mergeElementToArray(state.selectedRooms, removeProperty(action.room, 'error'))
      };

    case types.ADD_ROOM_FAIL:
      return {
        ...state,
        filteredRooms: utils.mergeElementToArray(state.filteredRooms, { ...action.room, error: action.error }),
        selectedRooms: utils.removeElementFromArray(state.selectedRooms, action.room.id)
      };

    case types.REMOVE_ROOM:
      return {
        ...state,
        selectedRooms: utils.removeElementFromArray(state.selectedRooms, action.id)
      };

    case types.CLEAR_SELECTED_ROOMS:
      return {
        ...state,
        selectedRooms: []
      };

    case types.BOOK_SUCCESS:
      return {
        ...state,
        selectedRooms: []
      };

    default:
      return state;
  }
}

function removeProperty(item, propertyName) {
  delete item[propertyName];
  return item;
}
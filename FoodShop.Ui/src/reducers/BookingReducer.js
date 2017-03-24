import * as types from '../constants/BookingConstants';

const initialState = {
  roomCategories: [],
  currentRoomCategory: {},
  filteredRooms: [],
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

    default:
      return state;
  }
}
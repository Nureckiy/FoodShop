import * as types from '../constants/UserProfileConstants';

const initialState = {
  userSubscriptions: [],
  subscriptions: [],
  orders: []
};

export default function UserProfileReducer(state = initialState, action) {
  switch (action.type) {

    case types.GET_PROFILE_SUBSCRIPTIONS_SUCCESS:
      return {
        ...state,
        userSubscriptions: action.data
      };

    case types.GET_ALL_SUBSCRIPTIONS_SUCCESS:
      return {
        ...state,
        subscriptions: action.data
      };

    case types.GET_ORDERS_SUCCESS:
      return {
        ...state,
        orders: action.data
      };

    default:
      return state;
  }
}
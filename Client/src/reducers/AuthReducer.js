import * as types from '../constants/AuthConstants';

const initialState = {
  profile: getProfile()
};

function getProfile() {
  return JSON.parse(localStorage.getItem('profile'));
}

export default function AuthReducer(state = initialState, action) {
  switch (action.type) {

    case types.LOGIN_SUCCESS:
      return {
        ...state,
        profile: action.data
      };


    case types.LOGOUT: {
      return {
        ...state,
        profile: null
      };
    }

    default:
      return state;
  }
}

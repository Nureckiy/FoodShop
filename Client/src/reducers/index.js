import { combineReducers } from 'redux';
import {routerReducer} from 'react-router-redux';

import AppReducer from './AppReducer';
import MenuReducer from './MenuReducer';
import UserProfileReducer from './UserProfileReducer';
import BookingReducer from './BookingReducer';

export default combineReducers({
  AppReducer,
  MenuReducer,
  UserProfileReducer,
  BookingReducer,
  routing: routerReducer
});
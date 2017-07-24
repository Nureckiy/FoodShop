import { combineReducers } from 'redux';
import {routerReducer} from 'react-router-redux';

import AppReducer from './AppReducer';
import MenuReducer from './MenuReducer';
import UserProfileReducer from './UserProfileReducer';
import AdminReducer from './AdminReducer';
import BookingReducer from './BookingReducer';

export default combineReducers({
  AppReducer,
  MenuReducer,
  UserProfileReducer,
  AdminReducer,
  BookingReducer,
  routing: routerReducer
});
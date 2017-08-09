import { combineReducers } from 'redux';
import {routerReducer} from 'react-router-redux';
import { i18nReducer } from 'redux-react-i18n';

import AppReducer from './AppReducer';
import AuthReducer from './AuthReducer';
import MenuReducer from './MenuReducer';
import UserProfileReducer from './UserProfileReducer';
import BookingReducer from './BookingReducer';
import ManageReducer from './ManageReducer';

export default combineReducers({
  AppReducer,
  AuthReducer,
  MenuReducer,
  UserProfileReducer,
  BookingReducer,
  ManageReducer,
  i18n: i18nReducer,
  routing: routerReducer
});